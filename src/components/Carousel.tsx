/**
 * EventCarousel.tsx
 *
 * React + TypeScript + Tailwind CSS + GSAP + Swiper Coverflow
 *
 * Install deps:
 *   npm install gsap swiper lucide-react
 *
 * Add to your global CSS (e.g. globals.css):
 *   @import 'swiper/swiper-bundle.css';
 *
 * Usage:
 *   import EventCarousel from './EventCarousel';
 *   <EventCarousel />
 *   <EventCarousel events={myEvents} />
 */

"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
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

// ─── Types ────────────────────────────────────────────────────────────────────
import 'swiper/swiper-bundle.css';

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
        fullDescription: string; // basic HTML supported
        price: string;
        capacity: string;
        organizer: string;
        tags: string[];
        website?: string;
    };
}

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMO_EVENTS: EventItem[] = [
    {
        id: 1,
        title: "Neon Frequencies",
        shortDescription: "An immersive electronic music experience under the stars.",
        date: "March 15, 2025",
        time: "9:00 PM",
        location: "The Warehouse, Brooklyn NY",
        category: "Music",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        accent: "#F59E0B",
        details: {
            fullDescription: `<p>Step into a world where <strong>bass meets light</strong>. Neon Frequencies brings together six world-class DJs for an all-night journey through techno, ambient, and everything in between.</p><p>The venue will be transformed with <em>state-of-the-art laser installations</em> and reactive LED walls that pulse in sync with the music.</p><ul><li>6 international DJ acts</li><li>3 immersive rooms</li><li>Full bar &amp; craft cocktail menu</li><li>Photography permitted until midnight</li></ul><p>Doors open at <strong>8:00 PM</strong>. Last entry at 11:00 PM. 21+ event.</p>`,
            price: "$45 – $120",
            capacity: "800 guests",
            organizer: "Frequency Collective",
            tags: ["Electronic", "Techno", "Immersive", "21+"],
            website: "https://example.com",
        },
    },
    {
        id: 2,
        title: "Urban Canvas 2025",
        shortDescription: "Street art festival transforming city walls into living galleries.",
        date: "April 3, 2025",
        time: "10:00 AM",
        location: "Arts District, Los Angeles CA",
        category: "Art",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
        accent: "#10B981",
        details: {
            fullDescription: `<p>Urban Canvas returns for its <strong>5th edition</strong>, transforming over 40 city blocks into an open-air gallery of monumental murals.</p><p>This year's theme is <em>"Roots &amp; Routes"</em> — exploring identity, migration, and belonging.</p><ul><li>60+ international muralists</li><li>Live painting throughout the weekend</li><li>Artist talks &amp; guided tours</li><li>Food trucks &amp; pop-up vendors</li></ul><p>Free and open to the public.</p>`,
            price: "Free (workshops $20)",
            capacity: "Unlimited",
            organizer: "LA Arts Collective",
            tags: ["Art", "Street Art", "Free", "Family Friendly"],
        },
    },
    {
        id: 3,
        title: "Cosmic Brews Fest",
        shortDescription: "300+ craft beers, live jazz, and a rooftop under the Milky Way.",
        date: "May 10, 2025",
        time: "4:00 PM",
        location: "Rooftop Arena, Chicago IL",
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        accent: "#8B5CF6",
        details: {
            fullDescription: `<p>The premier craft beer festival of the Midwest returns with an <strong>astronomical lineup</strong> of over 80 breweries and 300+ unique beers.</p><p>Set on Chicago's most spectacular rooftop, Cosmic Brews combines <em>world-class brews</em> with live jazz and a telescope station for stargazing.</p><ul><li>80+ craft breweries</li><li>Live jazz from 5 local bands</li><li>Telescope stargazing station</li><li>Gourmet food pairings</li></ul><p><strong>VIP Early Access</strong> at 2:00 PM includes a brewer's meet &amp; greet.</p>`,
            price: "$65 General / $110 VIP",
            capacity: "500 guests",
            organizer: "Great Lakes Beer Society",
            tags: ["Beer", "Jazz", "21+", "Rooftop"],
        },
    },
    {
        id: 4,
        title: "Code & Coffee Summit",
        shortDescription: "Two days of talks, workshops, and networking for builders.",
        date: "June 20, 2025",
        time: "8:30 AM",
        location: "Convention Center, Austin TX",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        accent: "#3B82F6",
        details: {
            fullDescription: `<p>Code &amp; Coffee Summit is the <strong>must-attend developer conference</strong> of the year, bringing together 2,000+ engineers and founders.</p><p>Topics include <em>AI/ML in production, WebAssembly, distributed systems</em> and the future of the web platform.</p><ul><li>50+ technical talks across 4 tracks</li><li>Hands-on workshops (limited seats)</li><li>Open-source hackathon with $10k prize pool</li><li>Unlimited specialty coffee all day</li></ul><p>Early bird pricing available until April 1st.</p>`,
            price: "$199 Early Bird / $349 Standard",
            capacity: "2,000 attendees",
            organizer: "DevCon Foundation",
            tags: ["Tech", "Networking", "Workshops", "Hackathon"],
            website: "https://example.com",
        },
    },
    {
        id: 5,
        title: "Sakura Night Market",
        shortDescription: "Japanese street food, lanterns, and live taiko drumming.",
        date: "April 12, 2025",
        time: "5:00 PM",
        location: "Cherry Blossom Park, Seattle WA",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        accent: "#F43F5E",
        details: {
            fullDescription: `<p>Celebrate the <strong>cherry blossom season</strong> at our annual Sakura Night Market — a magical evening of Japanese culture, food, and performance beneath illuminated blossom trees.</p><p>Over 50 vendors will offer <em>authentic Japanese street food</em>, handcrafted goods, and sake tastings. The evening culminates in a <strong>lantern release ceremony</strong>.</p><ul><li>50+ food &amp; craft vendors</li><li>Live taiko drumming performances</li><li>Traditional tea ceremony (ticketed)</li><li>Lantern release at 9:00 PM</li></ul><p>Free admission.</p>`,
            price: "Free entry",
            capacity: "Unlimited",
            organizer: "Seattle Japan Cultural Center",
            tags: ["Culture", "Food", "Family", "Free"],
        },
    },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

/** Splits title text into individual word <span>s for GSAP stagger targeting. */
function WordSplit({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} style={{ display: "block", overflow: "hidden" }}>
            {text.split(" ").map((word, i) => (
                <span key={i} className="ec-word inline-block" style={{ marginRight: "0.28em" }}>
                    {word}
                </span>
            ))}
        </span>
    );
}

// ─── Magnetic nav button ──────────────────────────────────────────────────────

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    strength?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
    ({ children, strength = 0.35, className, style, ...rest }, forwardedRef) => {
        const localRef = useRef<HTMLButtonElement>(null);
        const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? localRef;

        useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
            const onMove = (e: MouseEvent) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - r.left - r.width / 2) * strength);
                yTo((e.clientY - r.top - r.height / 2) * strength);
            };
            const onLeave = () => { xTo(0); yTo(0); };
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            return () => {
                el.removeEventListener("mousemove", onMove);
                el.removeEventListener("mouseleave", onLeave);
            };
        }, [ref, strength]);

        return (
            <button ref={ref} className={className} style={style} {...rest}>
                {children}
            </button>
        );
    }
);
MagneticButton.displayName = "MagneticButton";

// ─── Event Details Dialog ─────────────────────────────────────────────────────

const EventDialog: React.FC<{ event: EventItem; onClose: () => void }> = ({
    event,
    onClose,
}) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleClose = useCallback(() => {
        gsap
            .timeline({ onComplete: onClose })
            .to(panelRef.current, { y: 36, opacity: 0, scale: 0.96, duration: 0.22, ease: "power3.in" })
            .to(backdropRef.current, { opacity: 0, duration: 0.18 }, "-=0.1");
    }, [onClose]);

    const { accent } = event;

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", opacity: 0 }}
            onClick={(e) => e.target === backdropRef.current && handleClose()}
        >
            <div
                ref={panelRef}
                className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-hidden
                   rounded-t-3xl sm:rounded-2xl flex flex-col"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                {/* Hero */}
                <div className="relative h-44 sm:h-56 flex-shrink-0 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, #111 0%, rgba(0,0,0,0.25) 60%, transparent 100%)" }}
                    />
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center
                       justify-center transition-colors hover:bg-black/70"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                    >
                        <X size={17} className="text-white" />
                    </button>
                    <span
                        className="absolute bottom-4 left-4 text-[10px] font-extrabold uppercase
                       tracking-widest px-3 py-1 rounded-full"
                        style={{ background: accent, color: "#000" }}
                    >
                        {event.category}
                    </span>
                </div>

                {/* Scrollable content */}
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
                                    style={{
                                        background: hexToRgba(accent, 0.1),
                                        border: `1px solid ${hexToRgba(accent, 0.3)}`,
                                        color: accent,
                                    }}
                                >
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-[12px] mb-6 text-[#555]">
                            Organized by{" "}
                            <span className="font-semibold text-[#999]">{event.details.organizer}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center
                           justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
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
                                    className="flex-1 py-[14px] rounded-xl font-bold text-[13px] flex items-center
                             justify-center gap-2 no-underline transition-opacity hover:opacity-75"
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
};

// ─── Individual event card ────────────────────────────────────────────────────

interface EventCardProps {
    event: EventItem;
    index: number;
    total: number;
    isActive: boolean;
    onDetails: () => void;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
    ({ event, index, total, isActive, onDetails }, ref) => {
        const { accent } = event;
        return (
            <div
                ref={ref}
                className="relative rounded-3xl overflow-hidden select-none cursor-grab active:cursor-grabbing
                   h-[480px] sm:h-[520px] flex flex-col"
                style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: `0 30px 60px rgba(0,0,0,0.65), 0 0 50px ${hexToRgba(accent, 0.1)}`,
                }}
            >
                {/* Image — flex-1 fills remaining space after card body */}
                <div className="relative overflow-hidden flex-1 min-h-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: isActive
                                ? "linear-gradient(180deg, transparent 30%, #111 100%)"
                                : "linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.6) 60%, #111 100%)"
                        }}
                    />
                    {/* Category badge — targeted by GSAP */}
                    <span
                        className="ec-badge absolute top-4 left-4 text-[10px] font-extrabold uppercase
                       tracking-widest px-3 py-[5px] rounded-full"
                        style={{
                            background: accent,
                            color: "#000",
                            opacity: isActive ? undefined : 0,
                            pointerEvents: isActive ? undefined : 'none',
                        }}
                    >
                        {event.category}
                    </span>
                    {/* Counter */}
                    <span
                        className="ec-counter absolute top-4 right-4 text-[11px] font-bold px-2.5 py-[5px] rounded-full"
                        style={{
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(6px)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.15)",
                            opacity: isActive ? undefined : 0,
                            pointerEvents: isActive ? undefined : 'none',
                        }}
                    >
                        {index + 1} / {total}
                    </span>

                    {/* Inactive overlay title — centered on the image */}
                    <div
                        className="ec-inactive-title absolute bottom-0 left-0 right-0 p-5 flex items-end"
                        style={{
                            opacity: isActive ? 0 : 1,
                            transform: isActive ? 'translateY(10px)' : 'translateY(0)',
                            transition: 'opacity 0.35s ease, transform 0.35s ease',
                            pointerEvents: 'none',
                        }}
                    >
                        <h3
                            className="text-[26px] sm:text-[30px] font-black text-white leading-[1.1] text-center w-full"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "0.03em",
                                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                            }}
                        >
                            {event.title}
                        </h3>
                    </div>
                </div>

                {/* Card body — hidden when inactive, animated in when active */}
                <div
                    className="ec-card-body"
                    style={{
                        overflow: 'hidden',
                        maxHeight: isActive ? 400 : 0,
                        opacity: isActive ? 1 : 0,
                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                    }}
                >
                    <div className="p-5 pb-6">
                        {/* Title — word spans for GSAP */}
                        <div className="ec-title mb-2">
                            <WordSplit
                                text={event.title}
                                className="text-[28px] sm:text-[32px] font-black text-white leading-[1.1]"
                            />
                        </div>

                        {/* Description */}
                        <p
                            className="ec-desc text-[13px] font-light leading-relaxed mb-4"
                            style={{ color: "#888" }}
                        >
                            {event.shortDescription}
                        </p>

                        {/* Date + location chips */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            {/* date chip */}
                            <div
                                className="ec-chip flex items-center gap-1.5 text-[11px] font-medium
                           px-3 py-[6px] rounded-full text-[#ccc]"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                <Calendar size={11} style={{ color: accent }} />
                                {event.date}
                                <span style={{ color: accent, margin: "0 2px" }}>·</span>
                                <Clock size={11} style={{ color: accent }} />
                                {event.time}
                            </div>
                            {/* location chip */}
                            <div
                                className="ec-chip flex items-center gap-1.5 text-[11px] font-medium
                           px-3 py-[6px] rounded-full overflow-hidden max-w-full text-[#ccc]"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                <MapPin size={11} style={{ color: accent }} />
                                <span className="truncate">{event.location}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="ec-btns flex gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDetails(); }}
                                className="flex-1 py-[13px] rounded-xl text-[13px] font-semibold
                           transition-all hover:bg-white/5 active:scale-[0.97] text-[#ddd]"
                                style={{
                                    border: "1.5px solid rgba(255,255,255,0.15)",
                                    background: "transparent",
                                }}
                            >
                                More Details
                            </button>
                            <button
                                className="flex-1 py-[13px] rounded-xl text-[13px] font-bold
                           transition-opacity hover:opacity-90 active:scale-[0.97]"
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
);
EventCard.displayName = "EventCard";

// ─── Main component ───────────────────────────────────────────────────────────

interface EventCarouselProps {
    events?: EventItem[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events = DEMO_EVENTS }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dialogEvent, setDialogEvent] = useState<EventItem | null>(null);

    const swiperRef = useRef<SwiperType | null>(null);
    // Map of swiper index → card root element for GSAP targeting
    const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    // Track the last committed index so we skip animation on snap-back
    const lastIndexRef = useRef(0);

    const headingRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const activeEvent = events[activeIndex];
    const accent = activeEvent.accent;
    const total = events.length;

    // ── Animate the content of one card in (post-transition)
    const animateCardIn = useCallback((idx: number) => {
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

        // Kill any in-flight tweens first — fast swipes never queue up
        gsap.killTweensOf([...words, desc, ...chips, badge, counter, ...btns, inactiveTitle]);

        // Reset to hidden initial state
        gsap.set(words, { y: 26, opacity: 0, rotateZ: 2.5 });
        if (desc) gsap.set(desc, { y: 14, opacity: 0, filter: "blur(4px)" });
        gsap.set(chips, { x: -16, opacity: 0 });
        if (badge) gsap.set(badge, { scale: 0, opacity: 0 });
        if (counter) gsap.set(counter, { scale: 0, opacity: 0 });
        gsap.set(btns, { scale: 0.72, opacity: 0, y: 8 });

        // Fade out the inactive overlay title
        if (inactiveTitle) gsap.to(inactiveTitle, { opacity: 0, y: 10, duration: 0.1, ease: "power2.in" });

        // Staggered cascade — snappy durations, slight delay so card body CSS transition starts first
        gsap
            .timeline({ delay: 0.1 })
            .to(badge, { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(2.5)" })
            .to(counter, { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(2.5)" }, "-=0.12")
            .to(words, { y: 0, opacity: 1, rotateZ: 0, duration: 0.26, stagger: 0.038, ease: "back.out(1.5)" }, "-=0.1")
            .to(desc, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "power2.out" }, "-=0.18")
            .to(chips, { x: 0, opacity: 1, stagger: 0.07, duration: 0.22, ease: "power2.out" }, "-=0.16")
            .to(btns, { scale: 1, opacity: 1, y: 0, stagger: 0.06, duration: 0.24, ease: "back.out(1.8)" }, "-=0.14");
    }, []);

    // Kill in-progress content animations on the slide being left
    const killCardAnims = useCallback((idx: number) => {
        const card = cardRefs.current.get(idx);
        if (!card) return;
        gsap.killTweensOf(
            card.querySelectorAll(".ec-word, .ec-desc, .ec-chip, .ec-badge, .ec-counter, .ec-btns > *, .ec-inactive-title")
        );
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

    // ── Keyboard nav
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") swiperRef.current?.slidePrev();
            if (e.key === "ArrowRight") swiperRef.current?.slideNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // ── Page entrance
    useEffect(() => {
        gsap.fromTo(headingRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "expo.out", delay: 0.1 });
        gsap.fromTo(
            [navRef.current, progressRef.current],
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out", delay: 0.3 }
        );
    }, []);

    const progressPct = ((activeIndex + 1) / total) * 100;

    return (
        <>
            {/* Global styles — Swiper overrides + GSAP targets + rich text + fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .ec-root { font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }

        /* Allow coverflow peeks to bleed out of container */
        .ec-swiper.swiper { overflow: visible !important; }
        .ec-swiper .swiper-wrapper { align-items: center; }

        /* Custom coverflow shadows */
        .ec-swiper .swiper-slide-shadow-left,
        .ec-swiper .swiper-slide-shadow-right {
          background-image: linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0)) !important;
          border-radius: 24px;
        }

        /* Inactive slides dim slightly */
        .ec-swiper .swiper-slide:not(.swiper-slide-active) { filter: grayscale(100%) brightness(0.7); }

        /* Rich text inside dialog */
        .ec-rich p { margin-bottom: 0.7rem; }
        .ec-rich strong { color: #fff; font-weight: 700; }
        .ec-rich em { color: #ddd; font-style: italic; }
        .ec-rich ul { list-style: none; padding: 0; margin: 6px 0 10px; }
        .ec-rich li { padding-left: 18px; position: relative; margin-bottom: 5px; }
        .ec-rich li::before {
          content: '';
          position: absolute;
          left: 0; top: 9px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent, #F59E0B);
        }

        /* Hide scrollbar cross-browser */
        .ec-root *::-webkit-scrollbar { display: none; }
      `}</style>

            <div
                className="ec-root relative w-full min-h-screen flex flex-col items-center
                   justify-center py-10 px-0"
                style={{ background: "#080808" }}
            >
                {/* Dynamic background glow — CSS transition handles color change */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 75% 50% at 50% 0%, ${hexToRgba(accent, 0.14)} 0%, transparent 70%)`,
                        transition: "background 0.7s ease",
                    }}
                />

                {/* Noise texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px 200px",
                    }}
                />

                {/* ── Heading ── */}
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

                {/* ── Swiper — overflow:hidden clip wraps the coverflow peek ── */}
                <div className="relative z-10 w-full overflow-hidden">
                    <Swiper
                        className="ec-swiper"
                        modules={[EffectCoverflow]}
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        slidesPerView="auto"
                        speed={360}           // fast enough to feel responsive
                        coverflowEffect={{
                            rotate: 20,         // subtle tilt
                            stretch: -20,       // negative gap pulls slides apart so peeks are visible
                            depth: 200,         // 3-D z depth
                            modifier: 1,
                            slideShadows: true,
                        }}
                        onSwiper={onSwiper}
                        onSlideChange={onSlideChange}
                        onTransitionEnd={onTransitionEnd}
                    >
                        {events.map((ev, i) => (
                            <SwiperSlide
                                key={ev.id}
                                style={{ width: 380, maxWidth: "calc(100vw - 64px)" }}
                            >
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
                </div>

                {/* ── Nav row ── */}
                <div ref={navRef} className="relative z-10 flex items-center gap-5 mt-7">
                    <MagneticButton
                        aria-label="Previous event"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white
                       transition-colors hover:bg-white/10 hover:border-white/40"
                        style={{
                            border: "1.5px solid rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.04)",
                        }}
                    >
                        <ChevronLeft size={20} />
                    </MagneticButton>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-2">
                        {events.map((ev, i) => (
                            <button
                                key={i}
                                onClick={() => swiperRef.current?.slideTo(i)}
                                aria-label={`Go to event ${i + 1}`}
                                className="h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: i === activeIndex ? 26 : 8,
                                    background: i === activeIndex ? ev.accent : "rgba(255,255,255,0.22)",
                                }}
                            />
                        ))}
                    </div>

                    <MagneticButton
                        aria-label="Next event"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white
                       transition-colors hover:bg-white/10 hover:border-white/40"
                        style={{
                            border: "1.5px solid rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.04)",
                        }}
                    >
                        <ChevronRight size={20} />
                    </MagneticButton>
                </div>

                {/* ── Progress bar ── */}
                <div
                    ref={progressRef}
                    className="relative z-10 mt-5 w-[380px] max-w-[calc(100vw-64px)] h-0.5
                     rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${progressPct}%`,
                            background: `linear-gradient(90deg, ${hexToRgba(accent, 0.5)}, ${accent})`,
                        }}
                    />
                </div>

                <p className="relative z-10 mt-3.5 text-[11px] text-[#333]">
                    swipe · drag · ← → keys
                </p>
            </div>

            {/* ── Dialog ── */}
            {dialogEvent && (
                <EventDialog event={dialogEvent} onClose={() => setDialogEvent(null)} />
            )}
        </>
    );
};

export default EventCarousel;