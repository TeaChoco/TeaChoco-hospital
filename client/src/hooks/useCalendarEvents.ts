//-Path: "TeaChoco-Hospital/client/src/hooks/useCalendarEvents.ts"
import { useMemo } from 'react';
import { mockMedicines, mockAppointments } from '../mocks/data';
import type { CalendarEvent } from '../components/calendar/Calendar';

export function useCalendarEvents() {
    const events: CalendarEvent[] = useMemo(() => {
        const today = new Date();
        const medicineEvents: CalendarEvent[] = [];
        const appointmentEvents: CalendarEvent[] = mockAppointments.map((apt) => ({
            id: apt._id,
            title: `🩺 ${apt.purpose} (${apt.doctor?.firstName})`,
            start: new Date(apt.scheduledDate),
            end: new Date(new Date(apt.scheduledDate).getTime() + apt.expectedDuration * 60000),
            resource: apt,
            type: 'appointment',
        }));

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

    return events;
}
