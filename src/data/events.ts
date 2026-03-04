
export interface EventItem {
    id: number;
    title: string;
    shortDescription: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image: string;
    accent: string;
    details: {
        fullDescription: string;
        price: string;
        capacity: string;
        organizer: string;
        tags: string[];
        website?: string;
    };
}

const EVENTS_DATA: EventItem[] = [
    {
        id: 1,
        title: "Neon Frequencies",
        shortDescription: "An immersive electronic music experience under the stars.",
        date: "March 15, 2025",
        time: "9:00 PM",
        location: "The Warehouse, Brooklyn NY",
        category: "Music",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Step into a world where <strong>bass meets light</strong>. Neon Frequencies brings together six world-class DJs for an all-night journey through techno, ambient, and everything in between.</p><p>The venue will be transformed with <em>state-of-the-art laser installations</em> and reactive LED walls that pulse in sync with the music.</p><ul><li>6 international DJ acts</li><li>3 immersive rooms</li><li>Full bar &amp; craft cocktail menu</li><li>Photography permitted until midnight</li></ul><p>Doors open at <strong>8:00 PM</strong>. Last entry at 11:00 PM. 21+ event.</p>`,
            price: "$45 – $120",
            capacity: "800 guests",
            organizer: "Frequency Collective",
            tags: ["Electronic", "Techno", "Immersive", "21+"],
            website: "https://example.com",
        },
    },
    {
        id: 2,
        title: "Urban Canvas 2025",
        shortDescription: "Street art festival transforming city walls into living galleries.",
        date: "April 3, 2025",
        time: "10:00 AM",
        location: "Arts District, Los Angeles CA",
        category: "Art",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Urban Canvas returns for its <strong>5th edition</strong>, transforming over 40 city blocks into an open-air gallery of monumental murals.</p><p>This year's theme is <em>"Roots &amp; Routes"</em> — exploring identity, migration, and belonging.</p><ul><li>60+ international muralists</li><li>Live painting throughout the weekend</li><li>Artist talks &amp; guided tours</li><li>Food trucks &amp; pop-up vendors</li></ul><p>Free and open to the public.</p>`,
            price: "Free (workshops $20)",
            capacity: "Unlimited",
            organizer: "LA Arts Collective",
            tags: ["Art", "Street Art", "Free", "Family Friendly"],
        },
    },
    {
        id: 3,
        title: "Cosmic Brews Fest",
        shortDescription: "300+ craft beers, live jazz, and a rooftop under the Milky Way.",
        date: "May 10, 2025",
        time: "4:00 PM",
        location: "Rooftop Arena, Chicago IL",
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>The premier craft beer festival of the Midwest returns with an <strong>astronomical lineup</strong> of over 80 breweries and 300+ unique beers.</p><p>Set on Chicago's most spectacular rooftop, Cosmic Brews combines <em>world-class brews</em> with live jazz and a telescope station for stargazing.</p><ul><li>80+ craft breweries</li><li>Live jazz from 5 local bands</li><li>Telescope stargazing station</li><li>Gourmet food pairings</li></ul><p><strong>VIP Early Access</strong> at 2:00 PM includes a brewer's meet &amp; greet.</p>`,
            price: "$65 General / $110 VIP",
            capacity: "500 guests",
            organizer: "Great Lakes Beer Society",
            tags: ["Beer", "Jazz", "21+", "Rooftop"],
        },
    },
    {
        id: 4,
        title: "Code & Coffee Summit",
        shortDescription: "Two days of talks, workshops, and networking for builders.",
        date: "June 20, 2025",
        time: "8:30 AM",
        location: "Convention Center, Austin TX",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Code &amp; Coffee Summit is the <strong>must-attend developer conference</strong> of the year, bringing together 2,000+ engineers and founders.</p><p>Topics include <em>AI/ML in production, WebAssembly, distributed systems</em> and the future of the web platform.</p><ul><li>50+ technical talks across 4 tracks</li><li>Hands-on workshops (limited seats)</li><li>Open-source hackathon with $10k prize pool</li><li>Unlimited specialty coffee all day</li></ul><p>Early bird pricing available until April 1st.</p>`,
            price: "$199 Early Bird / $349 Standard",
            capacity: "2,000 attendees",
            organizer: "DevCon Foundation",
            tags: ["Tech", "Networking", "Workshops", "Hackathon"],
            website: "https://example.com",
        },
    },
    {
        id: 5,
        title: "Sakura Night Market",
        shortDescription: "Japanese street food, lanterns, and live taiko drumming.",
        date: "April 12, 2025",
        time: "5:00 PM",
        location: "Cherry Blossom Park, Seattle WA",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Celebrate the <strong>cherry blossom season</strong> at our annual Sakura Night Market — a magical evening of Japanese culture, food, and performance beneath illuminated blossom trees.</p><p>Over 50 vendors will offer <em>authentic Japanese street food</em>, handcrafted goods, and sake tastings. The evening culminates in a <strong>lantern release ceremony</strong>.</p><ul><li>50+ food &amp; craft vendors</li><li>Live taiko drumming performances</li><li>Traditional tea ceremony (ticketed)</li><li>Lantern release at 9:00 PM</li></ul><p>Free admission.</p>`,
            price: "Free entry",
            capacity: "Unlimited",
            organizer: "Seattle Japan Cultural Center",
            tags: ["Culture", "Food", "Family", "Free"],
        },
    },

    {
        id: 6,
        title: "Sakura Night Market",
        shortDescription: "Japanese street food, lanterns, and live taiko drumming.",
        date: "April 12, 2025",
        time: "5:00 PM",
        location: "Cherry Blossom Park, Seattle WA",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Celebrate the <strong>cherry blossom season</strong> at our annual Sakura Night Market — a magical evening of Japanese culture, food, and performance beneath illuminated blossom trees.</p><p>Over 50 vendors will offer <em>authentic Japanese street food</em>, handcrafted goods, and sake tastings. The evening culminates in a <strong>lantern release ceremony</strong>.</p><ul><li>50+ food &amp; craft vendors</li><li>Live taiko drumming performances</li><li>Traditional tea ceremony (ticketed)</li><li>Lantern release at 9:00 PM</li></ul><p>Free admission.</p>`,
            price: "Free entry",
            capacity: "Unlimited",
            organizer: "Seattle Japan Cultural Center",
            tags: ["Culture", "Food", "Family", "Free"],
        },
    },
    {
        id: 7,
        title: "Sakura Night Market",
        shortDescription: "Japanese street food, lanterns, and live taiko drumming.",
        date: "April 12, 2025",
        time: "5:00 PM",
        location: "Cherry Blossom Park, Seattle WA",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        accent: "#ffffff",
        details: {
            fullDescription: `<p>Celebrate the <strong>cherry blossom season</strong> at our annual Sakura Night Market — a magical evening of Japanese culture, food, and performance beneath illuminated blossom trees.</p><p>Over 50 vendors will offer <em>authentic Japanese street food</em>, handcrafted goods, and sake tastings. The evening culminates in a <strong>lantern release ceremony</strong>.</p><ul><li>50+ food &amp; craft vendors</li><li>Live taiko drumming performances</li><li>Traditional tea ceremony (ticketed)</li><li>Lantern release at 9:00 PM</li></ul><p>Free admission.</p>`,
            price: "Free entry",
            capacity: "Unlimited",
            organizer: "Seattle Japan Cultural Center",
            tags: ["Culture", "Food", "Family", "Free"],
        },
    },
];

export default EVENTS_DATA