//-Path: "TeaChoco-Hospital/client/src/pages/calendar/CalendarPage.tsx"
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../components/layout/ListLayout';
import { mockAppointments, mockMedicines } from '../../mocks/data';
import Calendar, { type CalendarEvent } from '../../components/calendar/Calendar';

export const CalendarPage: React.FC = () => {
    const navigate = useNavigate();

    const events: CalendarEvent[] = useMemo(() => {
        const appointmentEvents: CalendarEvent[] = mockAppointments.map((apt) => ({
            id: apt._id,
            title: `🩺 ${apt.purpose} (${apt.doctor?.firstName})`,
            start: new Date(apt.scheduledDate),
            end: new Date(new Date(apt.scheduledDate).getTime() + apt.expectedDuration * 60000),
            resource: apt,
            type: 'appointment',
        }));

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

    return (
        <ListLayout
            header="Health Calendar"
            newData="New Appointment"
            description="Track your appointments and medication schedule">
            <div className="h-[calc(100vh-200px)] bg-bg-card-light dark:bg-bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark text-text-light dark:text-text-dark transition-all duration-200">
                <Calendar
                    events={events}
                    onSelectEvent={(event) => {
                        if (event.type === 'appointment') navigate(`/appointments/${event.id}`);
                        else if (event.type === 'medicine') {
                            if (event.resource && '_id' in event.resource)
                                navigate(`/medicines/${event.resource._id}`);
                        }
                    }}
                    eventPropGetter={(event) => {
                        let backgroundColor = '#3174ad';
                        if (event.type === 'medicine') backgroundColor = '#10b981';
                        else if (event.type === 'appointment') backgroundColor = '#3b82f6';

                        return {
                            style: {
                                opacity: 0.8,
                                color: 'white',
                                backgroundColor,
                                borderRadius: '6px',
                            },
                        };
                    }}
                />
            </div>
        </ListLayout>
    );
};
