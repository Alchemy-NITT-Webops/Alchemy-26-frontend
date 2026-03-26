/**
 * Curated color palette matching the Alchemy website theme.
 * Purple / violet / pink / blue / green tones.
 */
const ACCENT_PALETTE = [
    '#3b82f6', // Blue
    '#92400e', // Brown
    '#16a34a', // Green
    '#8B5CF6', // Violet
    '#D946EF', // Fuchsia
    '#0076ad', // Teal
    '#6a1b9a', // Deep Purple
    '#A855F7', // Light Violet
    '#ec4899', // Pink
    '#f59e0b', // Amber
];

const GRADIENT_ANGLES = [145, 210, 165, 190, 135, 220, 155, 200, 170, 180];

/**
 * Get a deterministic accent color for a given index.
 * Cycles through the palette.
 */
export function getAccentColor(index: number): string {
    return ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

/**
 * Get a deterministic border color for guest lectures.
 */
export function getBorderColor(index: number): string {
    return ACCENT_PALETTE[(index + 3) % ACCENT_PALETTE.length];
}

/**
 * Get a deterministic gradient string for guest lectures.
 */
export function getGradient(index: number): string {
    const color = getBorderColor(index);
    const angle = GRADIENT_ANGLES[index % GRADIENT_ANGLES.length];
    return `linear-gradient(${angle}deg, ${color}, #000)`;
}
