import type { EventItem } from './events';
import workshop1 from '../assets/workshops/workshop1.webp'
import workshop2 from '../assets/workshops/workshop2.webp'
import workshop3 from '../assets/workshops/workshop3.webp'

const WORKSHOPS_DATA: EventItem[] = [
    {
        id: 1,
        title: "Process Modelling And Optimisation in MATLAB",
        shortDescription: "Learn to develop mathematical models and improve chemical process performance using MATLAB.",
        date: "April 10, 2026",
        time: "01:00 PM",
        location: "Chemical Department Simulation Lab",
        category: "WORKSHOP",
        image: workshop1,
        accent: "#0076ad",
        details: {
            fullDescription: `<p>Process Modelling and Optimisation in MATLAB provides a systematic, application-oriented introduction to developing mathematical models of chemical and engineering processes and improving their performance through optimisation techniques.</p><p>The workshop focuses on translating real-world process systems into equations based on mass and energy balances, kinetics, and transport phenomena.</p><ul><li>Hands-on exercises in MATLAB for steady-state and dynamic analysis</li><li>Formulating objective functions for process improvement</li><li>Simulating behavior under varying operating conditions</li></ul><p>The session is led by <strong>Dr Virivinti Nagajyothi</strong>, specializing in stochastic optimisation and process control.</p>`,
            price: "Rs. 150/-",
            capacity: "Individual Participation",
            organizer: "Dr. Virivinti Nagajyothi (NIT Tiruchirappalli)",
            tags: ["MATLAB", "Process Modelling", "Optimisation", "Chemical Engineering"],
            website: "https://forms.gle/2t5doHCPEkModgEc9"
        },
    },
    {
        id: 2,
        title: "From Atoms to Applications: Molecular Simulation for Engineers",
        shortDescription: "A practical introduction to atomic-scale interactions and hands-on molecular modelling using LAMMPS.",
        date: "April 12, 2026",
        time: "9:30 AM - 11:00 AM",
        location: "Chemical Department Simulation Lab",
        category: "WORKSHOP",
        image: workshop2,
        accent: "#6a1b9a",
        details: {
            fullDescription: `<p>This session provides a practical introduction to how atomic-scale interactions govern macroscopic engineering properties. Using real engineering examples and hands-on simulations with <strong>LAMMPS</strong>, participants will learn how molecular modelling accelerates material design.</p><ul><li>Translate atomic forces and structure into measurable quantities (strength, diffusion, etc.)</li><li>Optimise energy systems via simulation</li><li>Reduce the need for experimental trial-and-error</li></ul><p>The session is guided by <strong>Dr Nandlal Pingua</strong>, whose research focuses on molecular simulations of materials and energy-related systems.</p>`,
            price: "Rs. 150/-",
            capacity: "Individual Participation",
            organizer: "Dr. Nandlal Pingua (NIT Tiruchirappalli)",
            tags: ["Molecular Simulation", "LAMMPS", "Material Design", "Energy Systems"],
            website: "https://forms.gle/fmJySTaPDihoYBnH7"
        },
    },
    {
        id: 3,
        title: "DIY Teddy Bear Making Workshop",
        shortDescription: "Unlock your creativity and craft your very own cuddly companion in this hands-on teddy bear making session.",
        date: "April 11, 2026",
        time: "03:00 PM",
        location: "Chemical Department",
        category: "INFORMAL WORKSHOP",
        image: workshop3,
        accent: "#e91e63",
        details: {
            fullDescription: `<p>Unlock your creativity and craft your very own cuddly companion!</p><p>Join us for a hands-on workshop where you'll learn the art of making a handmade teddy bear from scratch. Whether you're looking to pick up a new hobby, create a personalized gift, or explore the basics of a small handicraft business, this session is perfect for you.</p><p>Materials will be provided.</p><p><strong>For Queries:</strong></p><ul><li>Vel Ashwin: 9994314713</li><li>Kajeshvaran: 6383172771</li><li>Yuvitha: 8248444925</li></ul>`,
            price: "₹250",
            capacity: "Individual Participation",
            organizer: "Alchemy 26",
            tags: ["DIY", "Teddy Bear", "Handicraft", "Creative Workshop"],
            website: "https://docs.google.com/forms/d/e/1FAIpQLSf8VT1Or3h8Prvgike2vDMI8ODtj81Mz7Tv5OsFBkeyIvTShQ/viewform"
        },
    }
];

export default WORKSHOPS_DATA;