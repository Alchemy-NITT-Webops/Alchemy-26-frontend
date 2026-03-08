import type { ChromaItem } from '../components/GuestLecture/GuestLecture';
import gl1 from '../assets/gl/gl1.png'
import gl2 from '../assets/gl/gl2.jpeg'

export const GUEST_LECTURES_DATA: ChromaItem[] = [
    {
        image: gl1,
        title: 'Rama Satya Kamesh',
        subtitle: 'Associate Director(Sustainability and ESG) at Deloitte',
        handle: '12th April,2026',
        borderColor: '#8B5CF6', // Purple
        gradient: 'linear-gradient(145deg,#8B5CF6,#000)',
        url: 'https://www.linkedin.com/in/rama-satya-kamesh-p-90850428?originalSubdomain=in'
    },
    {
        image: gl2,
        title: 'Saravanan Kolandaivelu',
        subtitle: 'Director, centrotherm India Pvt Limited',
        handle: 'Harvesting Sunshine: The Art and Science of PV Production',
        borderColor: '#D946EF', // Fuchsia/Pink
        gradient: 'linear-gradient(210deg,#D946EF,#000)',
        url: 'https://linkedin.com/in/'
    },
    {
        image: 'https://i.pravatar.cc/300?img=3',
        title: 'Morgan Blake',
        subtitle: 'UI/UX Designer',
        handle: '@morganblake',
        borderColor: '#A855F7', // Violet
        gradient: 'linear-gradient(165deg,#A855F7,#000)',
        url: 'https://dribbble.com/'
    }
];
