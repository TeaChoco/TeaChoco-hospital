//-Path: "TeaChoco-Hospital/client/src/pages/CalendarPage.tsx"
import './Calendar.css';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import type { Appointment } from '../types/appointment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockAppointments, mockMedicines } from '../mocks/data';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource?: Appointment | Medicine;
    type: 'appointment' | 'medicine';
}

export const CalendarPage: React.FC = () => {
    const navigate = useNavigate();
    // Combine appointments and medicines into events
    const events: CalendarEvent[] = useMemo(() => {
        const appointmentEvents: CalendarEvent[] = mockAppointments.map((apt) => ({
            id: apt._id,
            title: `🩺 ${apt.purpose} (${apt.doctor?.firstName})`,
            start: new Date(apt.scheduledDate),
            end: new Date(new Date(apt.scheduledDate).getTime() + apt.expectedDuration * 60000),
            resource: apt,
            type: 'appointment',
        }));

        // Generate medicine events for the next 7 days based on instructions
        const medicineEvents: CalendarEvent[] = [];
        const today = new Date();

        mockMedicines.forEach((med) => {
            if (!med.isActive) return;

            // Generate for next 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                // Add events based on frequency (simplified)
                med.takeInstructions.forEach((instruction) => {
                    let hour = 8;
                    if (instruction.mealTime === 'lunch') hour = 12;
                    if (instruction.mealTime === 'dinner') hour = 18;
                    if (instruction.mealTime === 'sleep') hour = 21;

                    // Set time
                    const startDate = new Date(date);
                    startDate.setHours(hour, 0, 0, 0);
                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + 15);

                    medicineEvents.push({
                        id: `${med._id}-${startDate.toISOString()}`,
                        title: `💊 ${med.name}`,
                        start: startDate,
                        end: endDate,
                        resource: med,
                        type: 'medicine',
                    });
                });
            }
        });

        return [...appointmentEvents, ...medicineEvents];
    }, []);

    const eventStyleGetter = (event: CalendarEvent) => {
        let backgroundColor = '#3174ad';
        if (event.type === 'medicine') {
            backgroundColor = '#10b981'; // Emerald 500
        } else if (event.type === 'appointment') {
            backgroundColor = '#3b82f6'; // Blue 500
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '6px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block',
            },
        };
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    Health Calendar
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                    Track your appointments and medication schedule
                </p>
            </div>

            <div className="flex-1 bg-bg-card-light dark:bg-bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark text-text-light dark:text-text-dark">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                    defaultView={Views.MONTH}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={(event) => {
                        if (event.type === 'appointment') {
                            navigate(`/appointments/${event.id}`);
                        } else if (event.type === 'medicine') {
                            // medicine id in event is composite "id-date", assuming resource has original _id
                            if (event.resource && '_id' in event.resource) {
                                navigate(`/medicines/${event.resource._id}`);
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};
