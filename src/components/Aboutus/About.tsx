import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { INTRO_LINE, PARAGRAPH_TEXT } from '../../data/about';

/* ──────────────────────────── Component ──────────────────────────── */

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLSpanElement>(null);
    const introLineRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    // const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dividerRef = useRef<HTMLDivElement>(null);

    const words = PARAGRAPH_TEXT.split(" ");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ─────────── Intro label slide-in ─────────── */
            gsap.fromTo(
                introRef.current,
                { xPercent: -110 },
                {
                    xPercent: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* horizontal accent line */
            gsap.fromTo(
                introLineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 78%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* ─────────── Title clip-path reveal ─────────── */
            gsap.fromTo(
                titleRef.current,
                { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    duration: 1.4,
                    scrollTrigger: {
                        trigger: titleWrapRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* ─────────── Paragraph word-by-word scroll reveal ─────────── */
            const validWords = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

            // Set initial dim state
            gsap.set(validWords, { opacity: 0.15, y: 0 });

            // Each word lights up as you scroll through the paragraph
            validWords.forEach((word, i) => {
                gsap.to(word, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: paragraphRef.current,
                        start: () => `top+=${(i / validWords.length) * 100}% 80%`,
                        end: () => `top+=${((i + 1) / validWords.length) * 100}% 80%`,
                        scrub: true,
                    },
                });
            });

            /* ─────────── Centre divider ─────────── */
            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: dividerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ──────────────────────────── JSX ──────────────────────────── */

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 selection:bg-white/20 selection:text-white"
        >
            {/* ── Content ── */}
            <div className="relative z-20 w-full max-w-6xl px-6 md:px-12">

                {/* Intro label + line */}
                <div className="flex items-center gap-4 mb-6 overflow-hidden">
                    <span
                        ref={introRef}
                        className="text-xs md:text-sm font-mono tracking-[0.3em] text-purple-400 uppercase whitespace-nowrap"
                    >
                        {INTRO_LINE}
                    </span>
                    <div
                        ref={introLineRef}
                        className="flex-1 h-px bg-linear-to-r from-purple-500/60 to-transparent origin-left"
                    />
                </div>

                {/* Title */}
                <div ref={titleWrapRef} className="overflow-hidden mb-12 md:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-600 leading-[0.9] will-change-transform"
                        style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                        About Us
                    </h2>
                </div>

                {/* Scroll-revealed paragraph */}
                <p
                    ref={paragraphRef}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed md:leading-snug max-w-4xl tracking-wide flex flex-wrap"
                >
                    {words.map((word, i) => (
                        <span
                            key={i}
                            ref={(el) => { wordRefs.current[i] = el; }}
                            className="inline-block mr-[0.3em] mb-[0.15em] will-change-[opacity]"
                        >
                            {word}
                        </span>
                    ))}
                </p>

                {/* Divider */}
                <div
                    ref={dividerRef}
                    className="mt-16 mb-8 md:mt-24 md:mb-12 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent origin-center"
                    style={{ transform: "scaleX(0)" }}
                />

            </div>
        </section>
    );
}