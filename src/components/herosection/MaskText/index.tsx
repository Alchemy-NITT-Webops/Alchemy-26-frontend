import './MaskText.css';
import { useRef, useEffect, createElement } from 'react';
import { gsap } from 'gsap';

interface MaskTextProps {
    phrases: string[];
    tag: string;
    ready?: boolean; // if provided, animation waits until ready is true
}

const MaskText = ({ phrases, tag, ready = true }: MaskTextProps) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = bodyRef.current;
        if (!el) return;

        const items = el.querySelectorAll<HTMLElement>('.line-mask-item');

        // Set initial state via GSAP (hidden below the overflow container)
        gsap.set(items, { yPercent: 100 });

        // If ready, animate immediately (for non-preloader usage or after preloader)
        if (ready && !hasAnimated.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated.current) {
                            hasAnimated.current = true;
                            gsap.to(items, {
                                yPercent: 0,
                                duration: 1,
                                stagger: 0.1,
                                ease: 'power2.out',
                            });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.3 }
            );

            observer.observe(el);
            return () => observer.disconnect();
        }
    }, [ready]);

    return (
        <div className="mask-text-body " ref={bodyRef}>
            {phrases.map((phrase, index) => (
                <div className="line-mask" key={index}>
                    {createElement(tag, { className: 'line-mask-item ' }, phrase)}
                </div>
            ))}
        </div>
    );
};

export default MaskText;