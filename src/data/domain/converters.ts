import type { Event, Faq, Footer, GuestLecture } from '../api/types';
import type { ApiEventItem, ApiGuestLectureItem, ApiDaySchedule, ApiFaqItem } from '../api/mockTypes';
import type { FooterApiResponse } from '../api/mockApi';
import type { EventItem, GuestLectureItem, DaySchedule, FooterData, FaqItem } from './types';
import { getAccentColor, getBorderColor, getGradient } from './theme';

// ─── Strapi → Domain converters (primary) ───────────────────────────

const API_URL = import.meta.env.VITE_STRAPI_URL || '/cms';

function resolveImageUrl(image?: { url?: string }): string | undefined {
    if (!image?.url) return undefined;
    // Strapi may return relative URLs
    return image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`;
}

export function strapiEventsToEventItems(events: Event[]): EventItem[] {
    return events.map((event, index) => ({
        id: event.id,
        title: event.title,
        shortDescription: event.shortDescription,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        image: resolveImageUrl(event.image),
        details: event.details ? {
            fullDescription: event.details.fullDescription,
            price: event.details.price,
            capacity: event.details.capacity,
            organizer: event.details.organizer,
            tags: Array.isArray(event.details.tags)
                ? event.details.tags
                : event.details.tags?.data || [],
            website: event.details.website,
        } : undefined,
        accent: getAccentColor(index),
    }));
}

export function strapiGuestLecturesToItems(lectures: GuestLecture[]): GuestLectureItem[] {
    return lectures.map((lecture, index) => ({
        image: resolveImageUrl(lecture.image) || '',
        name: lecture.name,
        designation: lecture.designation,
        date: lecture.date,
        topic: lecture.topic,
        url: lecture.url,
        borderColor: getBorderColor(index),
        gradient: getGradient(index),
    }));
}

export function strapiFaqsToFaqItems(faqs: Faq[]): FaqItem[] {
    return faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
    }));
}

export function strapiFooterToFooterData(footer: Footer): FooterData {
    return {
        contactDetails: {
            email: footer.contactDetails?.email || '',
            contacts: (footer.contactDetails?.contacts || []).map((c) => ({
                name: c.name || '',
                phone: c.phone || '',
            })),
            address: Array.isArray(footer.contactDetails?.address)
                ? footer.contactDetails.address
                : footer.contactDetails?.address
                    ? [String(footer.contactDetails.address)]
                    : [],
        },
        socials: (footer.socials || []).map((s) => ({
            label: s.label || '',
            icon: s.icon || '',
            url: s.url || '',
        })),
    };
}

// ─── Mock → Domain converters (fallback) ────────────────────────────

export function toEventItems(apiItems: ApiEventItem[]): EventItem[] {
    return apiItems.map((item, index) => ({
        ...item,
        accent: getAccentColor(index),
    }));
}

export function toGuestLectureItems(apiItems: ApiGuestLectureItem[]): GuestLectureItem[] {
    return apiItems.map((item, index) => ({
        ...item,
        borderColor: getBorderColor(index),
        gradient: getGradient(index),
    }));
}

export function toDaySchedules(apiSchedule: ApiDaySchedule[]): DaySchedule[] {
    return apiSchedule;
}

export function toFooterData(footerResponse: FooterApiResponse): FooterData {
    return {
        contactDetails: footerResponse.contactDetails,
        socials: footerResponse.socials,
    };
}

export function toFaqItems(apiItems: ApiFaqItem[]): FaqItem[] {
    return apiItems;
}
