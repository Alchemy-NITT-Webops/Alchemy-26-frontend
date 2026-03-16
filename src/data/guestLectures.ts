import type { ChromaItem } from '../components/GuestLecture/GuestLecture';
import gl1 from '../assets/gl/gl1.png'
import gl2 from '../assets/gl/gl2.jpeg'

export const GUEST_LECTURES_DATA: ChromaItem[] = [
    {
        image: gl1,
        title: 'Rama Satya Kamesh P',
        subtitle: 'Associate Director(Sustainability and ESG) at Deloitte',
        topic: 'Sustainability and ESG', // Added a default topic based on his designation
        date: '12th April, 2026',
        borderColor: '#8B5CF6', // Purple
        gradient: 'linear-gradient(145deg,#8B5CF6,#000)',
        url: 'https://www.linkedin.com/in/rama-satya-kamesh-p-90850428?originalSubdomain=in'
    },
    {
        image: gl2,
        title: 'Saravanan Kolandaivelu',
        subtitle: 'Director, centrotherm India Pvt Limited',
        topic: 'Harvesting Sunshine: The Art and Science of PV Production',
        date: 'Date: TBA', // Added a TBA date since it was omitted
        borderColor: '#D946EF', // Fuchsia/Pink
        gradient: 'linear-gradient(210deg,#D946EF,#000)',
        url: 'https://linkedin.com/' // General linkedin url
    },
    {
        image: gl2,
        title: 'Saravanan Kolandaivelu',
        subtitle: 'Director, centrotherm India Pvt Limited',
        topic: 'Harvesting Sunshine: The Art and Science of PV Production',
        date: 'Date: TBA', // Added a TBA date since it was omitted
        borderColor: '#D946EF', // Fuchsia/Pink
        gradient: 'linear-gradient(210deg,#D946EF,#000)',
        url: 'https://linkedin.com/' // General linkedin url
    }
];
