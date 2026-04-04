//-Path: "TeaChoco-Hospital/client/src/store/useAppointmentStore.ts"
import { create } from 'zustand';
import { useEffect } from 'react';
import { appointmentAPI } from '../services/api';
import type { Appointment } from '../types/appointment';

interface AppointmentState {
    appointments: Appointment[] | undefined;
    setAppointments: (appointments: Appointment[] | undefined) => void;
    fetchAppointments: () => Promise<void>;
    resetAppointments: () => void;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
    appointments: undefined,
    setAppointments: (appointments) => set({ appointments }),
    fetchAppointments: async () => {
        if (get().appointments !== undefined) return;
        try {
            const response = await appointmentAPI.findAll();
            set({ appointments: response.data });
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    },
    resetAppointments: () => set({ appointments: undefined }),
}));

export function useAppointments() {
    const { appointments, fetchAppointments, resetAppointments } = useAppointmentStore();

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return { appointments, resetAppointments };
}
