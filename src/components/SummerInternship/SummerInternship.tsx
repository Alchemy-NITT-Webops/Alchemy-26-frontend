import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SUMMER_INTERNSHIP_DATA } from '../../data/summerInternship';

gsap.registerPlugin(ScrollTrigger);

export default function SummerInternship() {
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
                ".internship-content",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".internship-container",
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
            id="summer-internship"
            ref={sectionRef}
            className="relative w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 selection:bg-white/20 selection:text-white"
        >
            <div className="internship-container relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col items-center">

                {/* Intro label + line */}
                <div className="flex items-center gap-4 mb-6 w-full max-w-lg overflow-hidden justify-center">
                    <div className="flex-1 h-px bg-linear-to-l from-emerald-500/60 to-transparent" />
                    <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase whitespace-nowrap">
                        Opportunity
                    </span>
                    <div className="flex-1 h-px bg-linear-to-r from-emerald-500/60 to-transparent" />
                </div>

                {/* Title */}
                <div className="w-full max-w-7xl px-4 md:px-8">
                    <div ref={titleWrapRef} className="overflow-hidden text-center mb-12 md:mb-16">
                        <h2
                            ref={titleRef}
                            className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-600 leading-[0.9] will-change-transform"
                            style={{ clipPath: "inset(0 100% 0 0)" }}
                        >
                            {SUMMER_INTERNSHIP_DATA.title}
                        </h2>
                    </div>
                </div>

                {/* Content Box */}
                <div className="internship-content w-full bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-opacity duration-500 group-hover:bg-emerald-500/20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none transition-opacity duration-500 group-hover:bg-blue-500/20" />

                    <div className="relative z-10 text-center">
                        {SUMMER_INTERNSHIP_DATA.descriptionLines.map((line, idx) => (
                            <p key={idx} className={`text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed ${idx === SUMMER_INTERNSHIP_DATA.descriptionLines.length - 1 ? 'mb-12' : 'mb-6'}`}>
                                {line}
                            </p>
                        ))}

                        {/* CTA Button */}
                        <a
                            href={SUMMER_INTERNSHIP_DATA.button.link}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            {SUMMER_INTERNSHIP_DATA.button.label}
                            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
