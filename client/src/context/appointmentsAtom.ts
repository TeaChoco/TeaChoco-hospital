//-Path: "TeaChoco-Hospital/client/src/context/appointmentsAtom.ts"
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { appointmentAPI } from '../services/api';
import type { Appointment } from '../types/appointment';

export const appointmentsAtom = atom<Appointment[] | undefined>(undefined);

export function useAppointments() {
    const [appointments, setAppointments] = useAtom(appointmentsAtom);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await appointmentAPI.findAll();
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        if (appointments === undefined) fetchAppointments();
    }, [appointments]);

    const resetAppointments = useCallback(() => setAppointments(undefined), []);

    return { appointments, resetAppointments };
}
