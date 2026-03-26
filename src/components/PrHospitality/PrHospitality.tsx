import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PR_HOSPITALITY_DATA } from '../../data/prHospitality';
import { VscCalendar, VscLock, VscCheck, VscHome, VscPerson, VscCallOutgoing } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (iconStr: string) => {
    switch (iconStr) {
        case 'time': return <VscLock size={24} className="text-purple-400" />;
        case 'calendar': return <VscCalendar size={24} className="text-pink-400" />;
        case 'food': return <VscCheck size={24} className="text-emerald-400" />;
        case 'money': return <VscHome size={24} className="text-amber-400" />;
        default: return <VscCheck size={24} className="text-white" />;
    }
};

export default function PrHospitality() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    duration: 1.4,
                    scrollTrigger: {
                        trigger: titleWrapRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                ".pr-col",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".pr-grid-container",
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="pr-hospitality"
            ref={sectionRef}
            className="relative w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 selection:bg-white/20 selection:text-white"
        >
            <div className="relative z-20 w-full max-w-6xl px-6 md:px-12 flex flex-col items-center">

                {/* Intro label + line */}
                <div className="flex items-center gap-4 mb-6 w-full max-w-lg overflow-hidden justify-center">
                    <div className="flex-1 h-px bg-linear-to-l from-purple-500/60 to-transparent" />
                    <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-purple-400 uppercase whitespace-nowrap">
                        Information
                    </span>
                    <div className="flex-1 h-px bg-linear-to-r from-purple-500/60 to-transparent" />
                </div>

                {/* Title */}
                <div ref={titleWrapRef} className="overflow-hidden mb-12 md:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-600 leading-[0.9] will-change-transform"
                        style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                        PR & Hospitality
                    </h2>
                </div>

                <div className="pr-grid-container w-full grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4 max-w-6xl">

                    {/* LEFT COLUMN: Accommodation Ticket */}
                    <div className="pr-col lg:col-span-7 flex flex-col h-full">
                        <div className="relative p-px rounded-3xl overflow-hidden group h-full shadow-[0_0_40px_rgba(168,85,247,0.05)]">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/30 via-transparent to-pink-500/30 group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-colors duration-500" />
                            <div className="relative bg-[#060010]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col">

                                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-pink-300">
                                    Alchemy Accommodation
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                                    {PR_HOSPITALITY_DATA.details.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="p-2 sm:p-2.5 bg-white/5 rounded-xl border border-white/10 shadow-inner shrink-0 mt-1 sm:mt-0">
                                                {getIcon(item.icon)}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">{item.label}</span>
                                                <span className="text-base sm:text-lg md:text-xl font-light text-gray-200 whitespace-pre-wrap leading-snug">
                                                    {item.value}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 sm:pt-8 border-t border-white/10 flex flex-col gap-4">
                                    <a
                                        href={PR_HOSPITALITY_DATA.registration.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-6 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 text-white text-base sm:text-lg font-bold tracking-wide hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-1"
                                    >
                                        Register for Accommodation →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact & Map */}
                    <div className="pr-col lg:col-span-5 flex flex-col gap-8 h-full">

                        {/* Contacts Box */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg">
                            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-200 flex items-center gap-3">
                                <VscCallOutgoing size={22} className="text-purple-400" /> For Queries
                            </h3>
                            <div className="flex flex-col gap-5 sm:gap-4">
                                {PR_HOSPITALITY_DATA.contacts.map((c, i) => (
                                    <div key={i} className="flex sm:items-center justify-between group flex-col sm:flex-row gap-1 sm:gap-0">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-colors">
                                                <VscPerson size={18} className="text-gray-400 group-hover:text-purple-300" />
                                            </div>
                                            <span className="text-gray-300 font-medium text-base sm:text-lg">{c.name}</span>
                                        </div>
                                        <a href={`tel:${c.phone}`} className="text-purple-300 hover:text-pink-300 transition-colors font-mono tracking-wide ml-11 sm:ml-0 text-sm sm:text-base">
                                            {c.phone}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Box */}
                        <div className="relative p-2 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md flex-1 min-h-[300px] overflow-hidden group shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent pointer-events-none" />
                            <iframe
                                title={PR_HOSPITALITY_DATA.map.title}
                                src={PR_HOSPITALITY_DATA.map.src}
                                className="absolute inset-2 border-0 rounded-2xl w-[calc(100%-16px)] h-[calc(100%-16px)] transition-all duration-700 pointer-events-auto"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
