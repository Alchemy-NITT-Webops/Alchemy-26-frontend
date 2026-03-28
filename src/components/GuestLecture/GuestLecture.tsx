import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './GuestLectureCard';

gsap.registerPlugin(ScrollTrigger);

export interface GuestLectureItem {
    image: string;
    name: string;
    designation: string;
    date: string;
    topic: string;
}

interface GuestLectureProps {
    items: GuestLectureItem[];
}

export default function GuestLecture({ items }: GuestLectureProps) {
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="guest-lectures"
            ref={sectionRef}
            className="relative py-20 flex flex-col items-center justify-center"
        >
            <div className=" text-center max-w-7xl px-4 md:px-8">
                <div ref={titleWrapRef} className="overflow-hidden mb-12 md:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-600 will-change-transform"
                        style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                        Guest Lecture
                    </h2>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 w-full max-w-7xl mx-auto px-4 md:px-8 pb-10">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-center flex-col items-center">
                        <TiltedCard
                            imageSrc={item.image}
                            altText={item.name}
                            captionText={item.name}
                            containerHeight="350px"
                            containerWidth="300px"
                            imageHeight="350px"
                            imageWidth="300px"
                            scaleOnHover={1.05}
                            rotateAmplitude={12}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <div
                                    className="w-full h-full flex flex-col justify-end p-6 rounded-[15px] border-2 transition-all duration-300 hover:border-[3px] border-purple-500/50 hover:border-fuchsia-400"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)'
                                    }}
                                >
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-md leading-tight">{item.name}</h3>
                                    <p className="text-xs sm:text-sm font-medium text-gray-300 mb-2 drop-shadow-sm">{item.designation}</p>
                                    <p className="text-xs font-semibold text-fuchsia-400 mb-0 tracking-wide">{item.date} • {item.topic}</p>
                                </div>
                            }
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
