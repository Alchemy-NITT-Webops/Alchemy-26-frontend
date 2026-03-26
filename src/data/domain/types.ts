// ─── Events & Workshops ─────────────────────────────────────────────
export interface EventDetails {
    fullDescription?: string;
    price?: string;
    capacity?: string;
    organizer?: string;
    tags?: string[];
    website?: string;
}

export interface EventItem {
    id: number | string;
    title: string;
    shortDescription?: string;
    date: string;
    time: string;
    location: string;
    category?: string;
    image?: string;
    details?: EventDetails;
    accent: string;
}

// ─── Guest Lectures ─────────────────────────────────────────────────
export interface GuestLectureItem {
    image: string;
    name: string;
    designation: string;
    date: string;
    topic: string;
    url: string;
    borderColor: string;
    gradient: string;
}

// ─── Schedule ───────────────────────────────────────────────────────
export type EventType = 'Event' | 'Workshop' | 'Guest Lecture';

export interface ScheduleEvent {
    id: string;
    type: EventType;
    time: string;
    venue: string;
    title: string;
}

export interface DaySchedule {
    day: number;
    date: string;
    events: ScheduleEvent[];
}

// ─── Footer ─────────────────────────────────────────────────────────
export interface ContactDetails {
    email: string;
    contacts: { name: string; phone: string }[];
    address: string[];
}

export interface Social {
    label: string;
    icon: string;
    url: string;
}

export interface FooterData {
    contactDetails: ContactDetails;
    socials: Social[];
}

// ─── FAQ ────────────────────────────────────────────────────────────
export interface FaqItem {
    id: string | number;
    question: string;
    answer: string;
}
