//-Path: "TeaChoco-Hospital/client/src/hooks/useCalendarEvents.ts"
import { useMemo } from 'react';
import { useMedicines } from '../context/medicinesAtom';
import { useAppointments } from '../context/appointmentsAtom';
import type { CalendarEvent } from '../components/calendar/Calendar';

export type UseCalendarEvents = ReturnType<typeof useCalendarEvents>;

export function useCalendarEvents(): {
    medicineEvents: CalendarEvent[] | undefined;
    appointmentEvents: CalendarEvent[] | undefined;
} {
    const { medicines } = useMedicines();
    const { appointments } = useAppointments();

    const medicineEvents: CalendarEvent[] | undefined = useMemo(() => {
        const today = new Date();
        const medicineEvents: CalendarEvent[] = [];
        medicines?.forEach((medicine) => {
            if (!medicine.isActive) return;

            // Generate for next 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                // Add events based on frequency (simplified)
                medicine.takeInstructions.forEach((instruction) => {
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
                        id: `${medicine._id}-${startDate.toISOString()}`,
                        title: `💊 ${medicine.name}`,
                        start: startDate,
                        end: endDate,
                        resource: medicine,
                        type: 'medicine',
                    });
                });
            }
        });
        return medicineEvents;
    }, [medicines]);

    const appointmentEvents: CalendarEvent[] | undefined = useMemo(
        () =>
            appointments?.map((apt) => ({
                id: apt._id,
                title: `🩺 ${apt.purpose} (${apt.doctor?.firstName})`,
                start: new Date(apt.scheduledDate),
                end: new Date(new Date(apt.scheduledDate).getTime() + apt.expectedDuration * 60000),
                resource: apt,
                type: 'appointment',
            })),
        [appointments],
    );

    return { medicineEvents, appointmentEvents };
}
