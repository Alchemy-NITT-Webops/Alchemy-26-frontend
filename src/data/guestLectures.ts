import type { GuestLectureItem } from '../components/GuestLecture/GuestLecture';
import gl1 from '../assets/gl/gl1.png'
import gl2 from '../assets/gl/gl2.jpeg'

export const GUEST_LECTURES_DATA: GuestLectureItem[] = [
    {
        image: gl1,
        name: 'Rama Satya Kamesh',
        designation: 'Associate Director (Sustainability and ESG) at Deloitte',
        date: '12th April, 2026',
        topic: 'Insights into Sustainability and ESG',
        url: 'https://www.linkedin.com/in/rama-satya-kamesh-p-90850428?originalSubdomain=in'
    },
    {
        image: gl2,
        name: 'Saravanan Kolandaivelu',
        designation: 'Director, centrotherm India Pvt Limited',
        date: '13th April, 2026',
        topic: 'Harvesting Sunshine: The Art and Science of PV Production',
        url: 'https://linkedin.com/in/'
    },
    {
        image: 'https://i.pravatar.cc/300?img=3',
        name: 'Morgan Blake',
        designation: 'UI/UX Designer',
        date: '14th April, 2026',
        topic: 'Designing the Future of Web',
        url: 'https://dribbble.com/'
    }
];
