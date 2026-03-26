// strapiApi.ts
import type {
    StrapiListResponse,
    StrapiResponse,
    Event,
    Faq,
    Footer,
    GuestLecture,
    StrapiQueryParams,
} from "./types";

// Fallback to localhost if env var is not set
const API_URL = "/cms/api"; 
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

// ADD THIS LINE
console.log("🚨 TOKEN CHECK:", API_TOKEN ? "Token exists!" : "TOKEN IS EMPTY!");
/**
 * Flatten nested params into bracket notation (e.g. populate[fields]=name)
 */
const flattenParams = (
  obj: Record<string, unknown>,
  prefix = ""
): [string, string][] => {
  const entries: [string, string][] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      entries.push(...flattenParams(value as Record<string, unknown>, fullKey));
    } else {
      entries.push([fullKey, String(value)]);
    }
  }
  return entries;
};

/**
 * Helper to build query strings
 */
const buildQueryString = (params?: StrapiQueryParams) => {
  const mergedParams = {
    populate: "*",
    ...params,
  };
  const pairs = flattenParams(mergedParams as unknown as Record<string, unknown>);
  const searchParams = new URLSearchParams(pairs);
  return `?${searchParams.toString()}`;
};

/**
 * Base fetch function with error handling
 */
async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (API_TOKEN) {
    defaultHeaders.Authorization = `Bearer ${API_TOKEN}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// --- API Methods ---

export const strapiApi = {
  // Events
  getEvents: (params?: StrapiQueryParams) =>
    fetchApi<StrapiListResponse<Event>>(`/events${buildQueryString(params)}`),
  getEventById: (id: string | number, params?: StrapiQueryParams) =>
    fetchApi<StrapiResponse<Event>>(`/events/${id}${buildQueryString(params)}`),

  // FAQs
  getFaqs: (params?: StrapiQueryParams) =>
    fetchApi<StrapiListResponse<Faq>>(`/faqs${buildQueryString(params)}`),
  getFaqById: (id: string | number, params?: StrapiQueryParams) =>
    fetchApi<StrapiResponse<Faq>>(`/faqs/${id}${buildQueryString(params)}`),

  // Guest Lectures
  getGuestLectures: (params?: StrapiQueryParams) =>
    fetchApi<StrapiListResponse<GuestLecture>>(
      `/guest-lectures${buildQueryString(params)}`
    ),
  getGuestLectureById: (id: string | number, params?: StrapiQueryParams) =>
    fetchApi<StrapiResponse<GuestLecture>>(
      `/guest-lectures/${id}${buildQueryString(params)}`
    ),

  // Footer (Single Type)
  getFooter: (params?: StrapiQueryParams) =>
    fetchApi<StrapiResponse<Footer>>(`/footer${buildQueryString({
      populate: {
        contactDetails: {
          populate: '*'
        },
        socials: {
          populate: '*'
        }
      },
      ...params
    })}`),
};