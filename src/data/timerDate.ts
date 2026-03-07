export const TARGET_DATE = new Date('2026-04-11T00:00:00+05:30').getTime();

export function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}
