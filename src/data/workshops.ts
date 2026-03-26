import type { EventItem } from './events';
import workshop1 from '../assets/workshops/workshop1.webp'
import workshop2 from '../assets/workshops/workshop2.webp'

const WORKSHOPS_DATA: EventItem[] = [
    {
        id: 1,
        title: "Process Modelling And Optimisation in MATLAB",
        shortDescription: "Learn to develop mathematical models and improve chemical process performance using MATLAB.",
        date: "April 10, 2026",
        time: "2:00 PM - 3:30 PM",
        location: "Chemical Engineering Department (Simulation lab)",
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
        location: "Chemical Engineering Department (TBA)",
        category: "WORKSHOP",
        image: workshop2,
        accent: "#6a1b9a",
        details: {
            fullDescription: `<p>This session provides a practical introduction to how atomic-scale interactions govern macroscopic engineering properties. Using real engineering examples and hands-on simulations with <strong>LAMMPS</strong>, participants will learn how molecular modelling accelerates material design.</p><ul><li>Translate atomic forces and structure into measurable quantities (strength, diffusion, etc.)</li><li>Optimise energy systems via simulation</li><li>Reduce the need for experimental trial-and-error</li></ul><p>The session is guided by <strong>Dr Nandlal Pingua</strong>, whose research focuses on molecular simulations of materials and energy-related systems.</p>`,
            price: "Rs. 150/-",
            capacity: "Individual Participation",
            organizer: "Dr. Nandlal Pingua (NIT Tiruchirappalli)",
            tags: ["Molecular Simulation", "LAMMPS", "Material Design", "Energy Systems"],
            website: "https://forms.gle/sTERw29BPcqcZM3AA"
        },
    }
];

export default WORKSHOPS_DATA;