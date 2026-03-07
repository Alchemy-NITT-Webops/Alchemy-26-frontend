import TiltedCard from './GuestLectureCard';

export interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    handle: string;
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
                        captionText={item.handle}
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
                                className="w-[300px] h-[350px] flex flex-col justify-end p-6 rounded-[15px] border-2 transition-all duration-300 hover:border-[3px]"
                                style={{
                                    borderColor: item.borderColor,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                                }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                                <p className="text-sm font-medium text-gray-200 mb-4 drop-shadow-sm">{item.subtitle}</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-semibold uppercase tracking-wider w-fit px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/80 transition-colors backdrop-blur-sm relative z-10"
                                    style={{ color: item.borderColor, border: `1px solid ${item.borderColor}` }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {item.handle}
                                </a>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
