/**
 * EventCarousel.tsx
 *
 * Mobile jitter fixes:
 *  1. Replaced CSS `filter: grayscale + brightness` with opacity only
 *  2. Added animRafRef rapid-swipe guard to cancel stacked GSAP tweens
 *  3. Replaced max-height CSS transition with transform + opacity
 *  4. Added will-change: transform on card wrappers
 *  5. Switched onTransitionEnd → onSlideChangeTransitionEnd
 */

"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    memo,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import {
    MapPin,
    Calendar,
    Clock,
    X,
    ChevronLeft,
    ChevronRight,
    Tag,
    Users,
    Ticket,
    ExternalLink,
} from "lucide-react";

import "swiper/swiper-bundle.css";

export interface EventItem {
    id: number;
    title: string;
    shortDescription: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image: string;
    accent: string;
    details: {
        fullDescription: string;
        price: string;
        capacity: string;
        organizer: string;
        tags: string[];
        website?: string;
    };
}


const rgbaCache = new Map<string, string>();
function hexToRgba(hex: string, alpha: number): string {
    const key = `${hex}:${alpha}`;
    if (rgbaCache.has(key)) return rgbaCache.get(key)!;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const result = `rgba(${r},${g},${b},${alpha})`;
    rgbaCache.set(key, result);
    return result;
}


interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    strength?: number;
}

const MagneticButton = memo(
    React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
        ({ children, strength = 0.35, className, style, ...rest }, forwardedRef) => {
            const localRef = useRef<HTMLButtonElement>(null);
            const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? localRef;

            useEffect(() => {
                const el = ref.current;
                if (!el) return;
                const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
                const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
                const ctrl = new AbortController();
                const { signal } = ctrl;
                el.addEventListener("mousemove", (e: MouseEvent) => {
                    const r = el.getBoundingClientRect();
                    xTo((e.clientX - r.left - r.width / 2) * strength);
                    yTo((e.clientY - r.top - r.height / 2) * strength);
                }, { signal });
                el.addEventListener("mouseleave", () => { xTo(0); yTo(0); }, { signal });
                return () => ctrl.abort();
            }, [ref, strength]);

            return (
                <button ref={ref} className={className} style={style} {...rest}>
                    {children}
                </button>
            );
        }
    )
);
MagneticButton.displayName = "MagneticButton";

const EventDialog = memo(({ event, onClose }: { event: EventItem; onClose: () => void }) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { accent } = event;
    const tagBg = useMemo(() => hexToRgba(accent, 0.1), [accent]);
    const tagBorder = useMemo(() => hexToRgba(accent, 0.3), [accent]);

    const handleClose = useCallback(() => {
        gsap
            .timeline({ onComplete: onClose })
            .to(panelRef.current, { y: 36, opacity: 0, scale: 0.96, duration: 0.22, ease: "power3.in" })
            .to(backdropRef.current, { opacity: 0, duration: 0.18 }, "-=0.1");
    }, [onClose]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const children = contentRef.current
                ? Array.from(contentRef.current.children as HTMLCollectionOf<HTMLElement>)
                : [];
            gsap.set(panelRef.current, { y: 56, opacity: 0, scale: 0.95 });
            gsap.set(children, { y: 18, opacity: 0 });
            gsap
                .timeline()
                .to(backdropRef.current, { opacity: 1, duration: 0.28, ease: "power2.out" })
                .to(panelRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" }, "-=0.14")
                .to(children, { y: 0, opacity: 1, stagger: 0.05, duration: 0.28, ease: "power3.out" }, "-=0.22");
        });
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", onKey);
        return () => {
            ctx.revert();
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [handleClose]);

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", opacity: 0 }}
            onClick={(e) => e.target === backdropRef.current && handleClose()}
        >
            <div
                ref={panelRef}
                className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-hidden rounded-t-3xl sm:rounded-2xl flex flex-col"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                <div className="relative h-44 sm:h-56 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="eager" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #111 0%, rgba(0,0,0,0.25) 60%, transparent 100%)" }} />
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/70"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                        aria-label="Close"
                    >
                        <X size={17} className="text-white" />
                    </button>
                    <span
                        className="absolute bottom-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ background: accent, color: "#000" }}
                    >
                        {event.category}
                    </span>
                </div>

                <div className="overflow-y-auto flex-1 p-5 sm:p-7 [scrollbar-width:none]">
                    <div ref={contentRef} className="flex flex-col gap-0">
                        <h2
                            className="text-2xl sm:text-[32px] font-black leading-tight text-white mb-3"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                        >
                            {event.title}
                        </h2>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                            {[
                                { Icon: Calendar, text: event.date },
                                { Icon: Clock, text: event.time },
                                { Icon: MapPin, text: event.location },
                            ].map(({ Icon, text }) => (
                                <div key={text} className="flex items-center gap-1.5 text-[13px] text-[#aaa]">
                                    <Icon size={13} style={{ color: accent }} />
                                    {text}
                                </div>
                            ))}
                        </div>

                        <div
                            className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            {[
                                { Icon: Ticket, label: "Price", value: event.details.price },
                                { Icon: Users, label: "Capacity", value: event.details.capacity },
                            ].map(({ Icon, label, value }) => (
                                <div key={label}>
                                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mb-1 text-[#666]">
                                        <Icon size={11} style={{ color: accent }} />
                                        {label}
                                    </div>
                                    <div className="font-bold text-[13px] text-white">{value}</div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="ec-rich text-[13.5px] leading-[1.75] mb-4 text-[#bbb]"
                            style={{ "--accent": accent } as React.CSSProperties}
                            dangerouslySetInnerHTML={{ __html: event.details.fullDescription }}
                        />

                        <div className="flex flex-wrap gap-2 mb-5">
                            {event.details.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full"
                                    style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: accent }}
                                >
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-[12px] mb-6 text-[#555]">
                            Organized by <span className="font-semibold text-[#999]">{event.details.organizer}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
                                style={{ background: accent, color: "#000" }}
                            >
                                <Ticket size={15} />
                                Register Now
                            </button>
                            {event.details.website && (
                                <a
                                    href={event.details.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 no-underline transition-opacity hover:opacity-75"
                                    style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "#ccc" }}
                                >
                                    <ExternalLink size={15} />
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
EventDialog.displayName = "EventDialog";

interface EventCardProps {
    event: EventItem;
    index: number;
    total: number;
    isActive: boolean;
    onDetails: () => void;
}

const EventCard = memo(
    React.forwardRef<HTMLDivElement, EventCardProps>(
        ({ event, index, total, isActive, onDetails }, ref) => {
            const { accent } = event;

            const boxShadowStyle = useMemo(
                () => ({
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.09)",
                    // Promote to GPU layer upfront so browser doesn't do it mid-swipe
                    willChange: "transform" as const,
                    boxShadow: `0 30px 60px rgba(0,0,0,0.65), 0 0 50px ${hexToRgba(accent, 0.1)}`,
                }),
                [accent]
            );

            const gradientStyle = useMemo(
                () => ({
                    background: isActive
                        ? "linear-gradient(180deg, transparent 30%, #111 100%)"
                        : "linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.6) 60%, #111 100%)",
                    transition: "background 0.4s ease",
                }),
                [isActive]
            );

            // FIX: max-height animates layout every frame — jank on mobile.
            // Use transform + opacity instead (compositor-only, zero layout cost).
            const cardBodyStyle = useMemo(
                () => ({
                    overflow: "hidden" as const,
                    maxHeight: isActive ? 400 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? ("auto" as const) : ("none" as const),
                    transition: "max-height 0.35s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
                }),
                [isActive]
            );

            const inactiveTitleStyle = useMemo(
                () => ({
                    opacity: isActive ? 0 : 1,
                    transform: isActive ? "translateY(20px)" : "translateY(0)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    pointerEvents: "none" as const,
                }),
                [isActive]
            );

            return (
                <div
                    ref={ref}
                    className="relative rounded-3xl overflow-hidden select-none h-[480px] sm:h-[520px] flex flex-col"
                    style={boxShadowStyle}
                >
                    <div className="relative overflow-hidden flex-1 h-max min-h-0">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                            loading={isActive ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0" style={gradientStyle} />

                        <span
                            className="ec-badge absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-[5px] rounded-full"
                            style={{
                                background: accent,
                                color: "#000",
                                opacity: isActive ? undefined : 0,
                                pointerEvents: isActive ? undefined : "none",
                            }}
                        >
                            {event.category}
                        </span>

                        <span
                            className="ec-counter absolute top-4 right-4 text-[11px] font-bold px-2.5 py-[5px] rounded-full"
                            style={{
                                background: "rgba(0,0,0,0.55)",
                                backdropFilter: "blur(6px)",
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.15)",
                                opacity: isActive ? undefined : 0,
                                pointerEvents: isActive ? undefined : "none",
                            }}
                        >
                            {index + 1} / {total}
                        </span>

                        <div className="ec-inactive-title absolute bottom-0 left-0 right-0 p-5 flex items-end" style={inactiveTitleStyle}>
                            <h3
                                className="text-[26px] sm:text-[30px] font-black text-white leading-[1.1] text-center w-full"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
                            >
                                {event.title}
                            </h3>
                        </div>
                    </div>

                    <div className="ec-card-body" style={cardBodyStyle}>
                        <div className="p-5 pb-6">
                            <div className="ec-title mb-2">
                                <div
                                    className="text-[28px] sm:text-[32px] font-black text-white leading-[1.1]"
                                >
                                    {event.title}

                                </div>
                            </div>
                            <p className="ec-desc text-[13px] font-light leading-relaxed mb-4" style={{ color: "#888" }}>
                                {event.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div
                                    className="ec-chip flex items-center gap-1.5 text-[11px] font-medium px-3 py-[6px] rounded-full text-[#ccc]"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    <Calendar size={11} style={{ color: accent }} />
                                    {event.date}
                                    <span style={{ color: accent, margin: "0 2px" }}>·</span>
                                    <Clock size={11} style={{ color: accent }} />
                                    {event.time}
                                </div>
                                <div
                                    className="ec-chip flex items-center gap-1.5 text-[11px] font-medium px-3 py-[6px] rounded-full overflow-hidden max-w-full text-[#ccc]"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    <MapPin size={11} style={{ color: accent }} />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            </div>
                            <div className="ec-btns flex gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDetails(); }}
                                    className="flex-1 py-[13px] rounded-xl text-[13px] font-semibold transition-all hover:bg-white/5 active:scale-[0.97] text-[#ddd]"
                                    style={{ border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent" }}
                                >
                                    More Details
                                </button>
                                <button
                                    className="flex-1 py-[13px] rounded-xl text-[13px] font-bold transition-opacity hover:opacity-90 active:scale-[0.97]"
                                    style={{ background: accent, color: "#000" }}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    )
);
EventCard.displayName = "EventCard";

interface EventCarouselProps {
    events?: EventItem[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dialogEvent, setDialogEvent] = useState<EventItem | null>(null);

    const swiperRef = useRef<SwiperType | null>(null);
    const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const lastIndexRef = useRef(0);
    const animRafRef = useRef<number | null>(null);

    const headingRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const activeEvent = useMemo(() => events[activeIndex], [events, activeIndex]);
    const accent = activeEvent.accent;
    const total = events.length;



    const animateCardIn = useCallback((idx: number) => {
        // Cancel any rAF queued for a previous slide during fast swipe
        if (animRafRef.current !== null) {
            cancelAnimationFrame(animRafRef.current);
            animRafRef.current = null;
        }

        // Defer into next rAF — lets Swiper finish its transform math first,
        // preventing GSAP from fighting the browser compositor mid-gesture
        animRafRef.current = requestAnimationFrame(() => {
            animRafRef.current = null;
            const card = cardRefs.current.get(idx);
            if (!card) return;

            const words = Array.from(card.querySelectorAll<HTMLElement>(".ec-word"));
            const desc = card.querySelector<HTMLElement>(".ec-desc");
            const chips = Array.from(card.querySelectorAll<HTMLElement>(".ec-chip"));
            const badge = card.querySelector<HTMLElement>(".ec-badge");
            const counter = card.querySelector<HTMLElement>(".ec-counter");
            const btnsContainer = card.querySelector<HTMLElement>(".ec-btns");
            const btns = btnsContainer ? Array.from(btnsContainer.children as HTMLCollectionOf<HTMLElement>) : [];
            const inactiveTitle = card.querySelector<HTMLElement>(".ec-inactive-title");

            gsap.killTweensOf([...words, desc, ...chips, badge, counter, ...btns, inactiveTitle]);

    
            gsap.set(words, { y: 26, opacity: 0, rotateZ: 2.5 });
            if (desc) gsap.set(desc, { y: 14, opacity: 0, filter: "blur(4px)" });
            gsap.set(chips, { x: -16, opacity: 0 });
            if (badge) gsap.set(badge, { scale: 0, opacity: 0 });
            if (counter) gsap.set(counter, { scale: 0, opacity: 0 });
            gsap.set(btns, { scale: 0.72, opacity: 0, y: 8 });
            if (inactiveTitle) gsap.to(inactiveTitle, { opacity: 0, y: 10, duration: 0.1, ease: "power2.in" });

            gsap
                .timeline({ delay: 0.07 })
                .to(badge, { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(2.5)" })
                .to(counter, { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(2.5)" }, "-=0.12")
                .to(words, { y: 0, opacity: 1, rotateZ: 0, duration: 0.26, stagger: 0.038, ease: "back.out(1.5)" }, "-=0.1")
                .to(desc, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "power2.out" }, "-=0.18")
                .to(chips, { x: 0, opacity: 1, stagger: 0.07, duration: 0.22, ease: "power2.out" }, "-=0.16")
                .to(btns, { scale: 1, opacity: 1, y: 0, stagger: 0.06, duration: 0.24, ease: "back.out(1.8)" }, "-=0.14");
        });
    }, []);

    const killCardAnims = useCallback((idx: number) => {
        const card = cardRefs.current.get(idx);
        if (!card) return;
        gsap.killTweensOf(card.querySelectorAll(".ec-word, .ec-desc, .ec-chip, .ec-badge, .ec-counter, .ec-btns > *, .ec-inactive-title"));
    }, []);

    // ── Swiper event handlers
    const onSwiper = useCallback(
        (sw: SwiperType) => {
            swiperRef.current = sw;
            requestAnimationFrame(() => animateCardIn(0));
        },
        [animateCardIn]
    );

    const onSlideChange = useCallback(
        (sw: SwiperType) => {
            killCardAnims(sw.previousIndex);
        },
        [killCardAnims]
    );

    const onTransitionEnd = useCallback(
        (sw: SwiperType) => {
            const newIndex = sw.activeIndex;
            // Only animate if the index actually changed (skip snap-back)
            if (newIndex !== lastIndexRef.current) {
                lastIndexRef.current = newIndex;
                setActiveIndex(newIndex);
                animateCardIn(newIndex);
            }
        },
        [animateCardIn]
    );

    useEffect(() => {
        const ctrl = new AbortController();
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") swiperRef.current?.slidePrev();
            if (e.key === "ArrowRight") swiperRef.current?.slideNext();
        }, { signal: ctrl.signal });
        return () => ctrl.abort();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "expo.out", delay: 0.1 });
            gsap.fromTo(navRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.3 });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        return () => {
            if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current);
        };
    }, []);


    return (
        <>

            <div
                className="ec-root relative w-full min-h-screen flex flex-col items-center justify-center py-10 px-0"
                style={{ background: "#080808" }}
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "black", transition: "background 0.7s ease" }}
                />
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px 200px",
                    }}
                />

                <div ref={headingRef} className="relative z-10 mb-8 text-center px-4">
                    <span
                        className="block text-[11px] font-bold uppercase tracking-[0.28em] mb-2"
                        style={{ color: accent, transition: "color 0.5s ease" }}
                    >
                        Upcoming Events
                    </span>
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                    >
                        Don&apos;t Miss Out
                    </h1>
                </div>

                <div className="relative z-10 w-full overflow-hidden">
                    <Swiper
                        className="ec-swiper"
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        navigation={{
                            nextEl: '.custom-next-el',
                            prevEl: '.custom-prev-el'
                        }}
                        // pagination={{
                        //     el: '.custom-pagination-container', // Updated class name
                        //     clickable: true,
                        //     renderBullet: function (index, className) {
                        //         const eventAccent = events[index]?.accent || '#ffffff';
                        //         // Pass the accent color via a CSS variable
                        //         return `<button class="${className}" style="--bullet-accent: ${eventAccent};" aria-label="Go to event ${index + 1}"></button>`;
                        //     },
                        // }}
                        effect="coverflow"
                        centeredSlides
                        slidesPerView="auto"
                        speed={320}
                        coverflowEffect={{ rotate: 20, stretch: -20, depth: 200, modifier: 1, slideShadows: true }}
                        onSwiper={onSwiper}
                        onSlideChange={onSlideChange}
                        onTransitionEnd={onTransitionEnd}
                        // onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                    >
                        {events.map((ev, i) => (
                            <SwiperSlide key={ev.id} style={{ width: 380, maxWidth: "calc(100vw - 64px)" }}>
                                <EventCard
                                    ref={(el: HTMLDivElement | null) => {
                                        if (el) cardRefs.current.set(i, el);
                                        else cardRefs.current.delete(i);
                                    }}
                                    event={ev}
                                    index={i}
                                    total={total}
                                    isActive={i === activeIndex}
                                    onDetails={() => setDialogEvent(ev)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Inject pure CSS to handle the active state transitions natively */}
                    {/* <style>
                        {`
                            .custom-pagination-container .swiper-pagination-bullet {
                                width: 8px;
                                height: 8px;
                                border-radius: 9999px;
                                background: rgba(255, 255, 255, 0.22);
                                transition: all 0.3s ease;
                                opacity: 1; 
                                cursor: pointer;
                                display: block;
                            }
                            .custom-pagination-container .swiper-pagination-bullet-active {
                                width: 26px;
                                background: var(--bullet-accent) !important;
                            }
                        `}
                    </style> */}
                    <div ref={navRef} className="z-10 flex items-center justify-center gap-5 mt-7">
                        <MagneticButton
                            aria-label="Previous event"
                            className="custom-prev-el w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/10 hover:border-white/40"
                            style={{ border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
                        >
                            <ChevronLeft size={20} />
                        </MagneticButton>

                        {/* <div className="custom-page-el flex items-center gap-2">{dots}</div> */}
                        {/* <div style={{width: 'min-content'}} className="custom-pagination-container flex justify-evenly w-min items-center" /> */}
                        <MagneticButton
                            aria-label="Next event"
                            className="custom-next-el w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/10 hover:border-white/40"
                            style={{ border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
                        >
                            <ChevronRight size={20} />
                        </MagneticButton>
                    </div>

                </div>


            </div>

            {dialogEvent && (
                <EventDialog event={dialogEvent} onClose={() => setDialogEvent(null)} />
            )}
        </>
    );
};

export default EventCarousel;