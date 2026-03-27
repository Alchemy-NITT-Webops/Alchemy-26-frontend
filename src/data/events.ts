import event1 from '../assets/events/event1.webp'
import event2 from '../assets/events/event2.webp'
import event3 from '../assets/events/event3.webp'

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
        title: "Bidathon",
        shortDescription: "A high-intensity, strategy-driven technical competition combining chemical engineering with competitive bidding.",
        date: "April 11, 2026",
        time: "TBA",
        location: "Chemical Engineering Department",
        category: "COMPETITION",
        image: event1,

        accent: "#3b82f6", // Bluish
        details: {
            fullDescription: `<p>Bidathon is a high-intensity, strategy-driven technical competition designed to test participants’ conceptual clarity, analytical skills, and confidence under time pressure. Unlike conventional quiz formats, Bidathon integrates a competitive bidding mechanism into chemical engineering problem-solving.</p><p>For each question presented, teams must bid the minimum time (in seconds) in which they believe they can correctly answer the question. The team quoting the lowest time earns the exclusive right to answer. Correct responses earn points, while incorrect responses result in negative marking, making strategic bidding equally important. The event aims to promote quick thinking, decision-making under constraints, and mastery of core concepts.</p>`,
            price: "Rs. 100/-",
            capacity: "Teams of 3–4 members",
            organizer: "TBA",
            tags: ["Strategy", "Chemical Engineering", "Time Pressure", "Bidding", "₹10k Prize"],
            website: "https://forms.gle/NHfQ25GK7t1aTwZA9"
        },
    },
    {
        id: 2,
        title: "Alchemy Paper Presentation",
        shortDescription: "Showcase your research, ignite innovation, and compete for a ₹10,000 prize pool.",
        date: "April 10, 2026",
        time: "TBA",
        location: "Chemical Engineering Department",
        category: "ACADEMIC",
        image: event2,

        accent: "#92400e", // Brownish
        details: {
            fullDescription: `<p>The Alchemy Paper Presentation Competition is a distinguished academic platform encouraging innovation, research excellence, and scientific inquiry. It offers participants the opportunity to present original research, novel ideas, or experimental findings to a knowledgeable audience and judging panel.</p><p>Participants will compete for a prize pool of ₹10,000. This is an excellent opportunity to enhance presentation skills, demonstrate subject expertise, and gain academic recognition among peers and professionals.</p>`,
            price: "Rs. 300/-",
            capacity: "1–3 members per team",
            organizer: "TBA",
            tags: ["Research", "Innovation", "₹10k Prize", "Presentation"],
            website: "https://forms.gle/WaTip2VAYHkf5Vn6A"
        },
    },
    {
        id: 3,
        title: "BIS Case Study",
        shortDescription: "Analyze real-world industrial challenges and apply Bureau of Indian Standards (BIS) guidelines to develop structured compliance solutions.",
        date: "April 12, 2026",
        time: "TBA",
        location: "Chemical Engineering Department",
        category: "CASE STUDY",
        image: event3,

        accent: "#16a34a", // Greenish
        details: {
            fullDescription: `<p>Participants in this event will be given a detailed, real-world industrial case study involving a specific operational, quality, or safety challenge. They will analyze the problem, explore the Bureau of Indian Standards (BIS) catalogue to identify relevant Indian Standards (IS), and apply these guidelines to develop a structured, practical solution.</p><p>The event will involve interpreting regulations, aligning them with industry practices, and presenting a clear, step-by-step approach that resolves the issue while ensuring full compliance with BIS standards. The event offers a total prize pool of ₹10,000 for the top-performing teams.</p>`,
            price: "Rs. 50/-",
            capacity: "TBA",
            organizer: "TBA",
            tags: ["Case Study", "BIS Standards", "Compliance", "₹10k Prize", "Problem Solving"],
            website: "https://forms.gle/U9cuFAVcMVxGoQDV8"
        },
    }
];

export default EVENTS_DATA;