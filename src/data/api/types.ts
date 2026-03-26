// types.ts

// --- Generic Strapi Types ---
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination?: Pagination;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: Meta;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Meta;
}

export interface UploadFile {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, any>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

// --- Components ---
export interface EventDetail {
  id: number | string;
  fullDescription?: string;
  price?: string;
  capacity?: string;
  organizer?: string;
  tags?: any;
  website?: string;
}

export interface Contact {
  id: number | string;
  name?: string;
  phone?: string;
}

export interface ContactDetail {
  id: number | string;
  email?: string;
  contacts?: Contact[];
  address?: any;
}

export interface Social {
  id: number | string;
  label?: string;
  icon?: string;
  url?: string;
}

// --- Main Entities ---

export interface Event {
  id: number | string;
  documentId: string;
  title: string;
  shortDescription?: string;
  date: string;
  time: string;
  location: string;
  category?: string;
  image?: UploadFile;
  details?: EventDetail;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface Faq {
  id: number | string;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface Footer {
  id: number | string;
  documentId: string;
  contactDetails?: ContactDetail;
  socials?: Social[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface GuestLecture {
  id: number | string;
  documentId: string;
  name: string;
  designation: string;
  topic: string;
  url: string;
  date: string;
  image?: UploadFile;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

// --- Query Parameters ---
export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  filters?: Record<string, any>;
  sort?: string | string[];
  fields?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
    withCount?: boolean;
  };
  locale?: string;
}