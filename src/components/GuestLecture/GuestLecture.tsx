import TiltedCard from './GuestLectureCard';
import type { GuestLectureItem } from '../../data/domain/types';

interface GuestLectureProps {
    items: GuestLectureItem[];
}

export default function GuestLecture({ items }: GuestLectureProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mx-auto px-4 md:px-8 pb-10">
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
                                className="w-[300px] h-[350px] flex flex-col justify-end p-4 rounded-[15px] border-2 transition-all duration-300 hover:border-[3px]"
                                style={{
                                    borderColor: item.borderColor,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 50%)'
                                }}
                            >
                                <h3 className="text-xl font-extrabold text-white drop-shadow-lg leading-tight">{item.name}</h3>
                                <p className="text-sm font-bold text-white mt-0.5" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)' }}>{item.designation}</p>
                                <div className="flex items-end justify-between gap-2 mt-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] text-gray-400 leading-snug">{item.topic}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{item.date}</p>
                                    </div>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[9px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 hover:bg-black/80 transition-colors backdrop-blur-sm shrink-0"
                                        style={{ color: item.borderColor, border: `1px solid ${item.borderColor}` }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
