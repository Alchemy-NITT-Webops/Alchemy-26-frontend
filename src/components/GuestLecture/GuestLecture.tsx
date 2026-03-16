import TiltedCard from './GuestLectureCard';

export interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    topic: string;
    date: string;
    borderColor: string;
    gradient: string;
    url: string;
}

interface GuestLectureProps {
    items: ChromaItem[];
}

export default function GuestLecture({ items }: GuestLectureProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mx-auto px-4 md:px-8 pb-10">
            {items.map((item, index) => (
                <div key={index} className="flex justify-center flex-col items-center">
                    <TiltedCard
                        imageSrc={item.image}
                        altText={item.title}
                        captionText={item.title}
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
                                className="w-[300px] h-[350px] flex flex-col justify-end p-5 rounded-[15px] border-2 transition-all duration-300 hover:border-[3px]"
                                style={{
                                    borderColor: item.borderColor,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 65%)'
                                }}
                            >
                                <div className="mt-auto flex flex-col">
                                    <h3 className="text-[18px] font-bold text-white mb-0.5 leading-tight drop-shadow-md">{item.title}</h3>
                                <p className="text-[12px] font-medium text-gray-300 mb-1 leading-snug drop-shadow-sm line-clamp-1">{item.subtitle}</p>
                                <p className="text-[12px] font-medium text-gray-100 mb-3 leading-tight drop-shadow-sm italic line-clamp-2">"{item.topic}"</p>

                                <div className="flex justify-between items-center mt-auto pb-1">
                                    <span className="text-[11px] font-bold drop-shadow-sm" style={{ color: item.borderColor }}>{item.date}</span>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-[8px] bg-black/50 hover:bg-black/80 transition-colors backdrop-blur-sm relative z-10 flex items-center justify-center gap-1.5"
                                        style={{ color: item.borderColor, border: `1px solid ${item.borderColor}` }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        Profile
                                    </a>
                                </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
