import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCHEDULE_DATA } from '../../data/schedule';

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const selectedDay = SCHEDULE_DATA[selectedDayIndex];
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'Guest Lecture': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
            case 'Workshop': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            default: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        }
    };

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
        <div ref={sectionRef} className="w-full h-screen flex  items-center justify-center flex-col pt-24 pb-8 px-2 md:px-8 relative z-10 overflow-hidden">
            {/* Title */}
            <div className="w-fit text-center px-4 md:px-8">
                <div ref={titleWrapRef} className="overflow-hidden mb-12 md:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-600 leading-[0.9] will-change-transform"
                        style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                        Schedule
                    </h2>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex justify-center items-stretch gap-4 md:gap-8 min-h-0 w-full max-w-6xl mx-auto p-5">

                {/* Days Column */}
                <div className="flex flex-col justify-around gap-3 md:gap-6 items-center shrink-0 w-8 md:w-16">
                    {SCHEDULE_DATA.map((day, index) => {
                        const isActive = selectedDayIndex === index;
                        return (
                            <div key={`day-wrapper-${day.day}`} className="relative flex items-center justify-center w-1/2 group">
                                {/* The glowing indicator bar animating between days */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeDayIndicator"
                                        className="absolute -left-2 md:-left-4 w-1 h-full bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <button
                                    onClick={() => setSelectedDayIndex(index)}
                                    className={`flex flex-col h-full items-center justify-center transition-all duration-300 w-full ${isActive ? 'text-white scale-110' : 'text-gray-600 hover:text-gray-300'}`}
                                >
                                    <div className={`flex flex-col items-center justify-center w-full transition-colors font-bold tracking-tight uppercase`}>
                                        <div className="text-[10px] md:text-sm  opacity-80">D</div>
                                        <div className="text-[10px] md:text-sm  opacity-80 ">A</div>
                                        <div className="text-[10px] md:text-sm  opacity-80 ">Y</div>
                                        <div className={`text-lg md:text-2xl font-black ${isActive ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : ''}`}>{day.day}</div>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Schedule Box Container */}
                <div className="flex-1 flex flex-col min-w-0 h-full border-2 border-white/20 rounded-xl md:rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md relative">

                    {/* Inner Scrollable Area */}
                    <div
                        className="flex-1 overflow-y-auto w-full p-4 md:p-6 custom-scrollbar relative"
                    // data-lenis-prevent="true"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`day-content-${selectedDayIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                            >
                                {selectedDay.events.map((event, i) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        className="group relative bg-[#0f0f0f] border border-white/10 rounded-xl p-4 md:p-5 overflow-hidden transition-all duration-300 hover:border-fuchsia-500/50 hover:bg-[#1a1a1a] shadow-xl flex flex-col justify-between"
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                            style={{ background: 'radial-gradient(circle at top right, rgba(217, 70, 239, 0.1) 0%, transparent 70%)' }}
                                        />

                                        <div className="relative z-10 flex flex-col h-full gap-3">

                                            <div className="flex justify-between items-start gap-2">
                                                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full border ${getBadgeColor(event.type)}`}>
                                                    {event.type}
                                                </span>
                                            </div>

                                            <div className="flex-1 my-1">
                                                <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-fuchsia-400 transition-colors duration-300">
                                                    {event.title}
                                                </h3>
                                            </div>

                                            <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium tracking-wide border-t border-white/10 pt-3 mt-1">
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400 shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                    <span className="truncate">{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <span className="truncate">{event.venue}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    margin: 8px 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </div>
    );
}