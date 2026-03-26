import type {
    ApiEventItem,
    ApiGuestLectureItem,
    ApiDaySchedule,
    ApiContactDetails,
    ApiSocial,
    ApiFaqItem,
} from './mockTypes';

import API_EVENTS_DATA from './mock/events';
import API_WORKSHOPS_DATA from './mock/workshops';
import API_GUEST_LECTURES_DATA from './mock/guestLectures';
import API_SCHEDULE_DATA from './mock/schedule';
import { API_CONTACT_DETAILS, API_SOCIALS } from './mock/footer';
import API_FAQ_DATA from './mock/faq';

export interface FooterApiResponse {
    contactDetails: ApiContactDetails;
    socials: ApiSocial[];
}

/**
 * Mock API service.
 * When the real Strapi backend is ready, replace these with fetch calls.
 */
export const mockApi = {
    getEvents: (): ApiEventItem[] => API_EVENTS_DATA,
    getWorkshops: (): ApiEventItem[] => API_WORKSHOPS_DATA,
    getGuestLectures: (): ApiGuestLectureItem[] => API_GUEST_LECTURES_DATA,
    getSchedule: (): ApiDaySchedule[] => API_SCHEDULE_DATA,
    getFooter: (): FooterApiResponse => ({
        contactDetails: API_CONTACT_DETAILS,
        socials: API_SOCIALS,
    }),
    getFaqs: (): ApiFaqItem[] => API_FAQ_DATA,
};
