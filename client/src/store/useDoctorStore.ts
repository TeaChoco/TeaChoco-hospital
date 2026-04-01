//-Path: "TeaChoco-Hospital/client/src/store/useDoctorStore.ts"
import { create } from 'zustand';
import { useEffect } from 'react';
import { doctorAPI } from '../services/api';
import type { Doctor } from '../types/doctor';

interface DoctorState {
    doctors: Doctor[] | undefined;
    setDoctors: (doctors: Doctor[] | undefined) => void;
    fetchDoctors: () => Promise<void>;
    resetDoctors: () => void;
}

export const useDoctorStore = create<DoctorState>((set, get) => ({
    doctors: undefined,
    setDoctors: (doctors) => set({ doctors }),
    fetchDoctors: async () => {
        if (get().doctors !== undefined) return;
        try {
            const response = await doctorAPI.findAll();
            set({ doctors: response.data });
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    },
    resetDoctors: () => set({ doctors: undefined }),
}));

export function useDoctors() {
    const { doctors, fetchDoctors, resetDoctors } = useDoctorStore();

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return { doctors, resetDoctors };
}
