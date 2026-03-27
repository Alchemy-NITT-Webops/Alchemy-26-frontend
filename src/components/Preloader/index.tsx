import './Preloader.css';
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PRELOADER_WORD } from '../../data/preloader';

const Preloader = ({
    setComplete,
}: {
    setComplete: Dispatch<SetStateAction<boolean>>;
}) => {
    const word = PRELOADER_WORD;

    const spans = useRef<(HTMLDivElement | null)[]>([]);
    const secondOverlayRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(spans.current, {
            y: '-100%',
            ease: 'back.out(1.7)',
            duration: 1.4,
            stagger: 0.05,
            delay: 0.7
        });

        tl.to([wrapperRef.current, secondOverlayRef.current], {
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'back.out(1.7)',
            duration: 1,
            stagger: 0.2,
            onComplete: () => {
                setComplete(true);
            },
        });

        tl.to(
            secondOverlayRef.current,
            {
                scaleY: 0,
                transformOrigin: 'top',
                ease: 'power4.inOut',
                duration: 1,
            },
            '-=0.9'
        );
    }, [setComplete]);

    return (
        <>
            <div className="preloader-wrapper" ref={wrapperRef}>
                <div className="preloader-inner">
                    <div className="preloader-letters">
                        {word.map((t, i) => (
                            <div
                                key={i}
                                className="preloader-letter"
                                ref={(element) => {
                                    spans.current[i] = element;
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="preloader-second-overlay" ref={secondOverlayRef} />
        </>
    );
};

export default Preloader;
