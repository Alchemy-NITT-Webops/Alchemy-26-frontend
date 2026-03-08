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
                venue: "EEE Audi",
                title: "Inauguration Ceremony"
            },
            {
                id: "d1-2",
                type: "Workshop",
                time: "11:30 PM",
                venue: "Chem Dept Simulation Lab",
                title: "Workshop 1"
            },
            {
                id: "d1-3",
                type: "Guest Lecture",
                time: "02:00 PM",
                venue: "EEE Audi",
                title: "Murugan Guest Lecture"
            },
            
            {
                id: "d1-4",
                type: "Event",
                time: "03:00 PM",
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
                venue: "EEE Audi",
                title: "BIS Case Study"
            },
            {
                id: "d2-2",
                type: "Guest Lecture",
                time: "11:30 AM",
                venue: "EEE Audi",
                title: "BIS Talk"
            },
            {
                id: "d2-3",
                type: "Guest Lecture",
                time: "02:00 PM",
                venue: "Seminar Hall",
                title: "Solar Guest Lecture"
            },
            {
                id: "d2-4",
                type: "Workshop",
                time: "03:00 PM",
                venue: "TBD",
                title: "Workshop 2"
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
                venue: "Chem Dept Simulation Lab",
                title: "Workshop 3"
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
                venue: "EEE Audi",
                title: "Bidathon"
            },
            {
                id: "d3-4",
                type: "Event",
                time: "04:00 PM",
                venue: "EEE Audi",
                title: "Valediction"
            }
        ]
    }
];
