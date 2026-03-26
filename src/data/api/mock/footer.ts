import type { ApiContactDetails, ApiSocial } from '../mockTypes';

export const API_CONTACT_DETAILS: ApiContactDetails = {
    email: 'alchemy.nitt.chemical@gmail.com',
    contacts: [
        { name: 'Steve', phone: '+919499920831' },
        { name: 'Madhumitha', phone: '+918015028585' }
    ],
    address: [
        "Department of Chemical Engineering,",
        "NIT Trichy, Thanjavur Road,",
        "Trichy - 620015."
    ]
};

export const API_SOCIALS: ApiSocial[] = [
    { label: 'LinkedIn', icon: 'Linkedin', url: "https://in.linkedin.com/in/department-of-chemical-engineering-nit-tiruchirappalli-b889143a2" },
    { label: 'Instagram', icon: 'Instagram', url: "https://www.instagram.com/alchemy_nitt/" },
];
