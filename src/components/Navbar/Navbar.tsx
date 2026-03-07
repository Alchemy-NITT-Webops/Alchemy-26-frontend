import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Lenis from "lenis";
import { VscHome, VscInfo, VscCalendar, VscMegaphone, VscBriefcase, VscQuestion, VscTools } from "react-icons/vsc";
import Dock, { type DockItemData } from "../Dock";
import StaggeredMenu from "../SideNav";
import { menuItems } from "../../data/sidenavbar";

const getNavItems = () => menuItems.map(item => ({
    id: item.link.replace('#', ''),
    name: item.label,
    url: `/${item.link}`
}));

function getIconForId(id: string) {
    switch (id) {
        case 'home': return <VscHome size={22} />;
        case 'about': return <VscInfo size={22} />;
        case 'events': return <VscCalendar size={22} />;
        case 'workshops': return <VscTools size={22} />;
        case 'schedule': return <VscBriefcase size={22} />;
        case 'contact': return <VscMegaphone size={22} />;
        default: return <VscQuestion size={22} />;
    }
}

const Header = ({ lenis }: { lenis: Lenis | null }) => {
    const navItems = getNavItems();
    const { scrollY } = useScroll();

    const [active, setActive] = useState('home');
    const [visible, setVisible] = useState(true);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const isMouseAtTop = event.clientY <= 200;
            setMouseAtTop((prev) => {
                if (prev && !isMouseAtTop) {
                    if (scrollY.get() > 100) {
                        setVisible(true);
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        timeoutRef.current = setTimeout(() => {
                            setVisible(false);
                        }, 3000);
                    }
                }
                return isMouseAtTop;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [scrollY]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (latest > previous && latest > 100 && !mouseAtTop) {
            setVisible(false);
        } else {
            setVisible(true);
            if (latest > 100) {
                timeoutRef.current = setTimeout(() => {
                    setVisible(false);
                }, 3000);
            }
        }
    });

    const handleClick = (url: string) => {
        if (url.startsWith('/#')) {
            const targetId = url.substring(2);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis?.scrollTo(targetElement);
            }
        } else {
            window.location.href = url;
        }
        // Force re-mount StaggeredMenu to close it after navigation
        // setMenuKey(prev => prev + 1);
    };

    useEffect(() => {
        const handleScroll = () => {
            navItems.forEach((item) => {
                const targetId = item.url.substring(2);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActive(item.id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navItems]);

    const dockItems: DockItemData[] = navItems.map((item) => ({
        icon: getIconForId(item.id),
        label: item.name,
        onClick: () => handleClick(item.url),
        className: active === item.id ? "border-white bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "border-neutral-700 bg-[#060010] text-gray-300"
    }));

    return (
        <motion.nav
            variants={{
                visible: { y: "0%" },
                hidden: { y: "-100%" },
            }}
            initial={false}
            animate={visible || mouseAtTop ? "visible" : "hidden"}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="select-none z-50 fixed top-0 w-full h-28 pointer-events-none"
        >
            <div className="absolute left-6 top-6 flex items-center pointer-events-auto">
                <img alt="logo" src="/logo.png" className="h-10 w-auto" />
            </div>
            <div className="w-full h-full pointer-events-auto">
                <Dock items={dockItems} dockHeight={80} panelHeight={64} baseItemSize={50} magnification={70} />
            </div>
        </motion.nav>
    );
};

// Imports moved to the top

const MobileNav = ({ lenis }: { lenis: Lenis | null }) => {

    const handleClick = (url: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }

        const isHash = url.startsWith('/#') || url.startsWith('#');
        if (isHash) {
            const targetId = url.startsWith('/#') ? url.substring(2) : url.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis?.scrollTo(targetElement);
            } else if (targetId === 'home') {
                // Fallback for home if no specific element is found, just scroll to top
                lenis?.scrollTo(0);
            }
        } else {
            window.location.href = url;
        }

    };

    return (
        <StaggeredMenu
            logoUrl='/logo.png'
            isFixed={true}
            position="right"
            items={menuItems}
            // socialItems={socialItems}
            colors={['#1a1a2e', '#5227FF']}
            accentColor="#5227FF"
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
            displayItemNumbering={true}
            displaySocials={true}
            onItemClick={handleClick}
        />

    );
}

const Navbar = ({ isMobile = false, lenis }: { isMobile: boolean, lenis: Lenis | null }) => {
    return !isMobile ? <Header lenis={lenis} /> : <MobileNav lenis={lenis} />;
};

export default Navbar;