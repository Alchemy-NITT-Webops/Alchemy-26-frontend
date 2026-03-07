import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────── Content ──────────────────────────── */

const INTRO_LINE = "WHO WE ARE";

const PARAGRAPH_TEXT =
    "We are a team of passionate engineers and designers crafting immersive digital experiences. Our mission is to build products that feel intuitive, elegant, and unforgettable.";

const FEATURES = [
    { number: "01", title: "Innovation", desc: "Pushing the boundaries of what's possible." },
    { number: "02", title: "Design", desc: "Crafting experiences that inspire wonder." },
    { number: "03", title: "Technology", desc: "Engineering the future, one line at a time." },
];

/* ──────────────────────────── Component ──────────────────────────── */

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLSpanElement>(null);
    const introLineRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dividerRef = useRef<HTMLDivElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);

    const words = PARAGRAPH_TEXT.split(" ");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            /* ── ambient blob float ── */
            gsap.to(blob1Ref.current, { rotation: 360, scale: 1.15, duration: 28, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(blob2Ref.current, { rotation: -360, scale: 1.2, duration: 32, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(blob3Ref.current, { rotation: 180, scale: 0.9, duration: 22, repeat: -1, yoyo: true, ease: "sine.inOut" });

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
                    ease: "power4.inOut",
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

            /* ─────────── Feature cards stagger ─────────── */
            const validFeatures = featureRefs.current.filter(Boolean) as HTMLDivElement[];

            gsap.fromTo(
                validFeatures,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: validFeatures[0],
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* ─────────── Parallax blobs on scroll ─────────── */
            gsap.to(blob1Ref.current, {
                yPercent: -40,
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });
            gsap.to(blob2Ref.current, {
                yPercent: 30,
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });
            gsap.to(blob3Ref.current, {
                yPercent: -20,
                xPercent: 10,
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ──────────────────────────── JSX ──────────────────────────── */

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-24 md:py-32 selection:bg-white/20 selection:text-white"
        >
            {/* Noise overlay */}
            <div
                className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ── Gradient blobs ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    ref={blob1Ref}
                    className="absolute -top-[10%] -left-[5%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] bg-purple-700/20 rounded-full blur-[120px]"
                />
                <div
                    ref={blob2Ref}
                    className="absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] bg-blue-600/20 rounded-full blur-[100px]"
                />
                <div
                    ref={blob3Ref}
                    className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] bg-pink-500/10 rounded-full blur-[130px]"
                />
            </div>

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
                        className="flex-1 h-px bg-gradient-to-r from-purple-500/60 to-transparent origin-left"
                    />
                </div>

                {/* Title */}
                <div ref={titleWrapRef} className="overflow-hidden mb-12 md:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 leading-[0.9] will-change-transform"
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
                    className="my-16 md:my-24 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
                    style={{ transform: "scaleX(0)" }}
                />

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={feat.number}
                            ref={(el) => { featureRefs.current[i] = el; }}
                            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 transition-colors duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] will-change-transform"
                        >
                            <span className="block text-5xl md:text-6xl font-black text-white/[0.06] mb-4 transition-colors duration-500 group-hover:text-purple-500/20">
                                {feat.number}
                            </span>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-tight">
                                {feat.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}