import event1 from '../assets/events/event1.jpeg'
import event3 from '../assets/events/event3.jpeg'

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
            price: "Free",
            capacity: "Teams of 3–4 members",
            organizer: "TBA",
            tags: ["Strategy", "Chemical Engineering", "Time Pressure", "Bidding", "₹10k Prize"],
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
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",

        accent: "#92400e", // Brownish
        details: {
            fullDescription: `<p>The Alchemy Paper Presentation Competition is a distinguished academic platform encouraging innovation, research excellence, and scientific inquiry. It offers participants the opportunity to present original research, novel ideas, or experimental findings to a knowledgeable audience and judging panel.</p><p>Participants will compete for a prize pool of ₹10,000. This is an excellent opportunity to enhance presentation skills, demonstrate subject expertise, and gain academic recognition among peers and professionals.</p>`,
            price: "Rs. 300/-",
            capacity: "1–3 members per team",
            organizer: "TBA",
            tags: ["Research", "Innovation", "₹10k Prize", "Presentation"],
        },
    },
    {
        id: 3,
        title: "BuildFromZero",
        shortDescription: "A high-stakes strategic simulation testing resource management, negotiation, and rapid problem-solving.",
        date: "April 12, 2026",
        time: "TBA",
        location: "Chemical Engineering Department",
        category: "SIMULATION",
        image: event3,

        accent: "#16a34a", // Greenish
        details: {
            fullDescription: `<p>The BuildFromZero Event is a high-stakes strategic simulation that tests resource management, negotiation skills, and rapid problem-solving. Teams must navigate a competitive market of assets, trading equipment, raw materials, and licenses to solve real-time Statements.</p><p>This event challenges participants to balance their Capital Points against their physical assets to build the most resilient industrial empire. Sharp instincts and quick decision-making will determine who rises to the top of the market.</p>`,
            price: "Free",
            capacity: "Teams of 3 members",
            organizer: "TBA",
            tags: ["Resource Management", "Negotiation", "Trading", "Simulation", "₹10k Prize"],
        },
    }
];

export default EVENTS_DATA;