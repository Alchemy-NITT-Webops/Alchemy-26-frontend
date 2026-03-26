// mockTypes.ts
// Lightweight types for local / mock data.
// These mirror the shapes used by the mock JSON data in ./mock/*.
// They intentionally differ from the full Strapi types in ./types.ts
// (no documentId, timestamps, UploadFile, etc.)

// ─── Events & Workshops ─────────────────────────────────────────────
export interface ApiEventDetails {
    fullDescription?: string;
    price?: string;
    capacity?: string;
    organizer?: string;
    tags?: string[];
    website?: string;
}

export interface ApiEventItem {
    id: number | string;
    title: string;
    shortDescription?: string;
    date: string;
    time: string;
    location: string;
    category?: string;
    image?: string;
    details?: ApiEventDetails;
}

// ─── Guest Lectures ─────────────────────────────────────────────────
export interface ApiGuestLectureItem {
    image: string;
    name: string;
    designation: string;
    date: string;
    topic: string;
    url: string;
}

// ─── Schedule ───────────────────────────────────────────────────────
export type EventType = 'Event' | 'Workshop' | 'Guest Lecture';

export interface ApiScheduleEvent {
    id: string;
    type: EventType;
    time: string;
    venue: string;
    title: string;
}

export interface ApiDaySchedule {
    day: number;
    date: string;
    events: ApiScheduleEvent[];
}

// ─── Footer ─────────────────────────────────────────────────────────
export interface ApiContact {
    name: string;
    phone: string;
}

export interface ApiContactDetails {
    email: string;
    contacts: ApiContact[];
    address: string[];
}

export interface ApiSocial {
    label: string;
    icon: string;
    url: string;
}

// ─── FAQ ────────────────────────────────────────────────────────────
export interface ApiFaqItem {
    id: string | number;
    question: string;
    answer: string;
}
