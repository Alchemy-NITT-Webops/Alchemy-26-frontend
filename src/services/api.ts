import { STRAPI_URL, STRAPI_TOKEN } from '../config';

// Define Data interfaces (Moved from individual files)
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

export interface FaqItem {
    question: string;
    answer: string;
}

export interface ScheduleEvent {
    time: string;
    venue: string;
    title: string;
    type: string;
}

export interface ScheduleDay {
    day: number;
    date: string;
    events: ScheduleEvent[];
}

export interface ContactItem {
    name: string;
    phone: string;
}

export interface ContactDetails {
    email: string;
    address: string;
    contacts: ContactItem[];
}

// Helper to extract rich text HTML from Strapi blocks
const extractRichTextHTML = (blocks: any[]): string => {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks.map(block => {
        if (block.type === 'paragraph' && block.children) {
            return block.children.map((child: { text: string }) => child.text).join('');
        }
        return '';
    }).join('');
};

// Generic fetcher
const fetchAPI = async (endpoint: string) => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`
            }
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.statusText}`);
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
};

export const fetchEvents = async (): Promise<EventItem[]> => {
    const data = await fetchAPI('events?populate=*');
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((item: any) => {
        const imageUrl = item.image?.[0]?.url ? `${STRAPI_URL}${item.image[0].url}` : '';
        return {
            id: item.id,
            title: item.title,
            shortDescription: item.shortDescription,
            date: item.date,
            time: item.time ? item.time.substring(0, 5) : "TBA", // e.g. "17:00:00.000" -> "17:00"
            location: item.location,
            category: item.category,
            image: imageUrl,
            accent: item.accent || "#3b82f6",
            details: {
                fullDescription: extractRichTextHTML(item.details?.fullDescription),
                price: item.details?.price || "Free",
                capacity: item.details?.capacity || "TBA",
                organizer: item.details?.organizer || "TBA",
                tags: item.details?.tags ? item.details.tags.split(',') : [],
                website: item.details?.website
            }
        };
    });
};

export const fetchWorkshops = async (): Promise<EventItem[]> => {
    const data = await fetchAPI('workshops?populate=*');
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((item: any) => {
        const imageUrl = item.image?.[0]?.url ? `${STRAPI_URL}${item.image[0].url}` : '';
        return {
            id: item.id,
            title: item.title,
            shortDescription: item.shortDescription,
            date: item.date,
            time: item.time ? item.time.substring(0, 5) : "TBA",
            location: item.location,
            category: item.category,
            image: imageUrl,
            accent: item.accent || "#0076ad",
            details: {
                fullDescription: extractRichTextHTML(item.details?.fullDescription),
                price: item.details?.price || "Free",
                capacity: item.details?.capacity || "TBA",
                organizer: item.details?.organizer || "TBA",
                tags: item.details?.tags ? item.details.tags.split(',') : [],
                website: item.details?.website
            }
        };
    });
};

export const fetchGuestLectures = async (): Promise<ChromaItem[]> => {
    const data = await fetchAPI('guestlectures?populate=*');
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => {
        const imageUrl = item.image?.url ? `${STRAPI_URL}${item.image.url}` : '';
        return {
            image: imageUrl,
            title: item.title,
            subtitle: item.subtitle,
            topic: item.topic,
            date: item.date,
            borderColor: item.borderColor || "#8B5CF6",
            gradient: item.gradient || "linear-gradient(145deg,#8B5CF6,#000)",
            url: item.url || "#"
        };
    });
};

export const fetchFAQs = async (): Promise<FaqItem[]> => {
    const data = await fetchAPI('faqs');
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => ({
        question: item.question,
        answer: item.answer
    }));
};

export const fetchSchedules = async (): Promise<ScheduleDay[]> => {
    const data = await fetchAPI('schedules?populate=*');
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => ({
        day: item.day,
        date: item.date,
        events: (item.events || []).map((e: any) => ({
            time: e.time ? e.time.substring(0, 5) : "",
            venue: e.venue,
            title: e.title,
            type: e.type
        }))
    }));
};

export const fetchContactDetails = async (): Promise<ContactDetails | null> => {
    const data = await fetchAPI('contact-details?populate=*');
    if (!data) return null;
    
    // Contact details is singular in the example but Strapi usually returns an object if find(), or an array if findMany()
    // It seems its findMany and taking the first or just object
    const details = Array.isArray(data) ? data[0] : data;
    if (!details) return null;

    return {
        email: details.email,
        address: details.address,
        contacts: (details.contacts || []).map((c: any) => ({
            name: c.name,
            phone: c.phone
        }))
    };
};
