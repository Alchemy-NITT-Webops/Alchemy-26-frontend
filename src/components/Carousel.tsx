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
import { EffectCoverflow, Pagination } from "swiper/modules";
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
} from "lucide-react";

import "swiper/swiper-bundle.css";

import type { EventItem } from "../data/domain/types";


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
                <div className="relative h-44 sm:h-56 overflow-hidden shrink-0">
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

                <div
                    className="overflow-y-auto flex-1 p-5 sm:p-7 min-h-0 ec-dialog-scroll"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
                    data-lenis-prevent
                >
                    <div ref={contentRef} className="flex flex-col gap-0">
                        <h2
                            className="text-2xl sm:text-[32px] font-black leading-tight text-white mb-3 tracking-wide"
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
                                { Icon: Ticket, label: "Price", value: event.details?.price || "TBA" },
                                { Icon: Users, label: "Capacity", value: event.details?.capacity || "TBA" },
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
                            dangerouslySetInnerHTML={{ __html: event.details?.fullDescription || "" }}
                        />

                        <div className="flex flex-wrap gap-2 mb-5">
                            {event.details?.tags?.map((tag) => (
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
                            Organized by <span className="font-semibold text-[#999]">{event.details?.organizer || "TBA"}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {event.details?.website ? (
                                <a
                                    href={event.details.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98] no-underline"
                                    style={{ background: accent, color: "#000" }}
                                >
                                    <Ticket size={15} />
                                    Register Now
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ background: accent, color: "#000" }}
                                >
                                    <Ticket size={15} />
                                    Register Now
                                </button>
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
                    background: "linear-gradient(180deg, transparent 30%, #111 100%)",
                }),
                []
            );

            return (
                <div
                    ref={ref}
                    className="relative rounded-3xl overflow-hidden select-none h-[480px] sm:h-[520px] flex flex-col"
                    style={{
                        ...boxShadowStyle,
                        cursor: isActive ? "default" : "pointer",   // ← add this

                    }}
                >
                    {/* Animated Borders */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                        {/* Top-Right growing border (starts top-left, ends bottom-right) */}
                        <rect
                            x="0" y="0" width="100%" height="100%" rx="24"
                            fill="none" stroke={accent} strokeWidth="4"
                            pathLength="100"
                            strokeDasharray={isActive ? "50 100" : "0 100"}
                            strokeDashoffset="0"
                            style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        />
                        {/* Bottom-Left growing border (starts bottom-right, ends top-left) */}
                        <rect
                            x="0" y="0" width="100%" height="100%" rx="24"
                            fill="none" stroke={accent} strokeWidth="4"
                            pathLength="100"
                            strokeDasharray={isActive ? "50 100" : "0 100"}
                            strokeDashoffset="-50"
                            style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        />
                    </svg>

                    <div className="relative overflow-hidden flex-1 h-max min-h-0">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                            loading="lazy"
                        />
                        <div className="absolute inset-0" style={gradientStyle} />

                        <span
                            className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-[5px] rounded-full"
                            style={{
                                background: accent,
                                color: "#000",
                            }}
                        >
                            {event.category}
                        </span>

                        <span
                            className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-[5px] rounded-full"
                            style={{
                                background: "rgba(0,0,0,0.55)",
                                backdropFilter: "blur(6px)",
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.15)",
                            }}
                        >
                            {index + 1} / {total}
                        </span>
                    </div>

                    <div className="shrink-0">
                        <div className="p-5 pb-6">
                            <div className="mb-2">
                                <div
                                    className="text-[28px] sm:text-[32px] font-black text-white leading-[1.1]"
                                >
                                    {event.title}

                                </div>
                            </div>
                            <p className="text-[13px] font-light leading-relaxed mb-4" style={{ color: "#888" }}>
                                {event.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div
                                    className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-[6px] rounded-full text-[#ccc]"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    <Calendar size={11} style={{ color: accent }} />
                                    {event.date}
                                    <span style={{ color: accent, margin: "0 2px" }}>·</span>
                                    <Clock size={11} style={{ color: accent }} />
                                    {event.time}
                                </div>
                                <div
                                    className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-[6px] rounded-full overflow-hidden max-w-full text-[#ccc]"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    <MapPin size={11} style={{ color: accent }} />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDetails(); }}
                                    className="flex-1 py-[13px] rounded-xl text-[13px] font-semibold transition-all hover:bg-white/5 active:scale-[0.97] text-[#ddd]"
                                    style={{ border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent" }}
                                >
                                    More Details
                                </button>
                                {event.details?.website ? (
                                    <a
                                        href={event.details.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-[13px] rounded-xl text-[13px] font-bold transition-opacity hover:opacity-90 active:scale-[0.97] no-underline flex items-center justify-center"
                                        style={{ background: accent, color: "#000" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Register
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex-1 py-[13px] rounded-xl text-[13px] font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ background: accent, color: "#000" }}
                                    >
                                        Register
                                    </button>
                                )}
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
    title?: string;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events = [], title = "Events" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dialogEvent, setDialogEvent] = useState<EventItem | null>(null);

    const swiperRef = useRef<SwiperType | null>(null);

    const headingRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const total = events.length;

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

    const handleSwiperAreaClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const clickX = e.clientX;
        const clickY = e.clientY;

        swiper.slides.forEach((slide, i) => {
            const rect = slide.getBoundingClientRect();
            if (
                clickX >= rect.left &&
                clickX <= rect.right &&
                clickY >= rect.top &&
                clickY <= rect.bottom
            ) {
                if (i !== swiper.activeIndex) {
                    swiper.slideTo(i);
                }
            }
        });
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
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500 tracking-wide"
                        style={{
                        }}
                    >
                        {title}
                    </h1>
                </div>

                <div className="relative z-10 w-full overflow-hidden" onClick={handleSwiperAreaClick}>
                    <Swiper
                        className="ec-swiper"
                        modules={[EffectCoverflow, Pagination]}
                        effect="coverflow"
                        centeredSlides
                        slidesPerView="auto"
                        speed={320}
                        coverflowEffect={{ rotate: 20, stretch: -20, depth: 200, modifier: 1, slideShadows: true }}
                        onSwiper={(sw) => {
                            swiperRef.current = sw;
                            setActiveIndex(sw.activeIndex);
                        }}
                        onSlideChange={(sw) => {
                            setActiveIndex(sw.activeIndex);
                        }}
                    >
                        {events.map((ev, i) => (
                            <SwiperSlide
                                key={`${ev.id}-${i}`}
                                style={{ width: 380, maxWidth: "calc(100vw - 64px)" }}
                                onClick={() => {
                                    if (i !== activeIndex) {
                                        swiperRef.current?.slideTo(i);
                                    }
                                }}
                            >
                                <EventCard
                                    event={ev}
                                    index={i}
                                    total={total}
                                    isActive={i === activeIndex}
                                    onDetails={() => setDialogEvent(ev)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div ref={navRef} className="z-10 flex items-center justify-center gap-5 mt-7">
                        <MagneticButton
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeIndex > 0) swiperRef.current?.slidePrev();
                            }}
                            aria-label="Previous event"
                            className={`custom-prev-el w-12 h-12 rounded-full flex items-center justify-center transition-colors ${activeIndex === 0 ? '' : 'hover:bg-white/10 hover:border-white/40'}`}
                            style={{
                                border: "1.5px solid rgba(255,255,255,0.15)",
                                background: "rgba(255,255,255,0.04)",
                                color: activeIndex === 0 ? "rgba(255,255,255,0.3)" : "white",
                                cursor: activeIndex === 0 ? "not-allowed" : "pointer"
                            }}
                        >
                            <ChevronLeft size={20} />
                        </MagneticButton>

                        <MagneticButton
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeIndex < total - 1) swiperRef.current?.slideNext();
                            }}
                            aria-label="Next event"
                            className={`custom-next-el w-12 h-12 rounded-full flex items-center justify-center transition-colors ${activeIndex === total - 1 ? '' : 'hover:bg-white/10 hover:border-white/40'}`}
                            style={{
                                border: "1.5px solid rgba(255,255,255,0.15)",
                                background: "rgba(255,255,255,0.04)",
                                color: activeIndex === total - 1 ? "rgba(255,255,255,0.3)" : "white",
                                cursor: activeIndex === total - 1 ? "not-allowed" : "pointer"
                            }}
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