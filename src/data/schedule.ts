export type EventType = 'Event' | 'Workshop' | 'Guest Lecture';

export interface ScheduleEvent {
    id: string;
    type: EventType;
    time: string;
    venue: string;
    title: string;
}

export interface DaySchedule {
    day: number;
    date: string;
    events: ScheduleEvent[];
}

export const SCHEDULE_DATA: DaySchedule[] = [
    {
        day: 1,
        date: "April 10, 2026",
        events: [
            {
                id: "d1-1",
                type: "Event",
                time: "09:30 AM",
                venue: "EEE Auditorium",
                title: "Inauguration Ceremony"
            },
            {
                id: "d1-2",
                type: "Guest Lecture",
                time: "11:00 AM",
                venue: "EEE Auditorium",
                title: "Guest Lecture by Mr. Murugan"
            },
            {
                id: "d1-3",
                type: "Workshop",
                time: "01:00 PM",
                venue: "Chemical Department Simulation Lab",
                title: "MATLAB Workshop"
            },
            {
                id: "d1-4",
                type: "Event",
                time: "02:00 PM",
                venue: "Seminar Hall",
                title: "Paper Presentation"
            }
        ]
    },
    {
        day: 2,
        date: "April 11, 2026",
        events: [
            {
                id: "d2-1",
                type: "Event",
                time: "09:30 AM",
                venue: "EEE Auditorium",
                title: "BIS Case Study"
            },
            // {
            //     id: "d2-2",
            //     type: "Guest Lecture",
            //     time: "11:30 AM",
            //     venue: "EEE Auditorium",
            //     title: "Guest Lecture by Mr. Ramadoss"
            // },
            {
                id: "d2-2",
                type: "Guest Lecture",
                time: "02:00 PM",
                venue: "Seminar Hall",
                title: "Guest Lecture on Solar Energy"
            },
            {
                id: "d2-3",
                type: "Workshop",
                time: "03:00 PM",
                venue: "Chemical Department",
                title: "Teddy Bear Workshop"
            },
            {
                id: "d2-4",
                type: "Event",
                time: "04:00 PM",
                venue: "EEE Auditorium",
                title: "Placement Talk"
            }
        ]
    },
    {
        day: 3,
        date: "April 12, 2026",
        events: [
            {
                id: "d3-1",
                type: "Workshop",
                time: "09:30 AM",
                venue: "Chemical Department Simulation Lab",
                title: "Molecular Dynamics & Simulation Workshop"
            },
            {
                id: "d3-2",
                type: "Guest Lecture",
                time: "11:30 AM",
                venue: "Seminar Hall",
                title: "Deloitte Guest Lecture"
            },
            {
                id: "d3-3",
                type: "Event",
                time: "02:00 PM",
                venue: "EEE Auditorium",
                title: "Bidathon"
            },
            {
                id: "d3-4",
                type: "Event",
                time: "04:00 PM",
                venue: "EEE Auditorium",
                title: "Valediction Ceremony"
            }
        ]
    }
];
