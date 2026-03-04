import { useState, useEffect } from 'react';
import Counter from './DtgCounter';
import './CountdownTimer.css';

const TARGET_DATE = new Date('2026-04-11T00:00:00+05:30').getTime();

function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export default function CountdownTimer() {
    const [time, setTime] = useState(getTimeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const units = [
        { label: 'Days', value: time.days, places: [100, 10, 1] as number[] },
        { label: 'Hours', value: time.hours, places: [10, 1] as number[] },
        { label: 'Minutes', value: time.minutes, places: [10, 1] as number[] },
        { label: 'Seconds', value: time.seconds, places: [10, 1] as number[] },
    ];

    return (
        <div className="countdown-section" id="countdown">
            <div className="countdown-grid">
                {units.map(({ label, value, places }) => (
                    <div className="countdown-unit" key={label}>
                        <Counter
                            value={value}
                            fontSize={48}
                            padding={4}
                            places={places}
                            gap={2}
                            borderRadius={8}
                            horizontalPadding={4}
                            textColor="#fff"
                            fontWeight={700}
                            gradientFrom="#0a0a0a"
                            gradientTo="transparent"
                            gradientHeight={8}
                        />
                        <span className="countdown-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
