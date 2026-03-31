import type { GuestLectureItem } from '../components/GuestLecture/GuestLecture';
import gl1 from '../assets/gl/gl1.webp'
import gl2 from '../assets/gl/gl2.webp'
import gl3 from '../assets/gl/gl3.webp'
import gl4 from '../assets/gl/gl4.webp'


export const GUEST_LECTURES_DATA: GuestLectureItem[] = [
    {
        image: gl3,
        name: 'Murugan Natrajan',
        designation: 'VP (Operations), Tamilnadu Petrolproducts Ltd.',
        date: '10th April, 2026 | 11:00 am | EEE Auditorium',
        topic: 'The Net-Zero Blueprint'
    },
    {
        image: gl2,
        name: 'Saravanan Kolandaivelu',
        designation: 'Director, centrotherm India Pvt Limited',
        date: '11th April, 2026 | 2:00 pm | Seminar Hall',
        topic: 'The Art and Science of PV Production'
    },
    {
        image: gl1,
        name: 'Rama Satya Kamesh',
        designation: 'Associate Director (Sustainability and ESG), Deloitte',
        date: '12th April, 2026 | 11:30 am | Seminar Hall',
        topic: 'Technologies Powering the Net-zero transition'
    },
    {
        image: gl4,
        name: 'Ramadoss C',
        designation: 'Senior Manager, CPCL',
        date: '11th April, 2026 | 11:30 am | EEE Auditorium',
        topic: 'Keynote Talk'
    }
];
