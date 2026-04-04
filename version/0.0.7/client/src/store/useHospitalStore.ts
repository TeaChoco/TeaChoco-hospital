//-Path: "TeaChoco-Hospital/client/src/store/useHospitalStore.ts"
import { create } from 'zustand';
import { useEffect } from 'react';
import { hospitalAPI } from '../services/api';
import type { Hospital } from '../types/hospital';

interface HospitalState {
    hospitals: Hospital[] | undefined;
    setHospitals: (hospitals: Hospital[] | undefined) => void;
    fetchHospitals: () => Promise<void>;
    resetHospitals: () => void;
}

export const useHospitalStore = create<HospitalState>((set, get) => ({
    hospitals: undefined,
    setHospitals: (hospitals) => set({ hospitals }),
    fetchHospitals: async () => {
        if (get().hospitals !== undefined) return;
        try {
            const response = await hospitalAPI.findAll();
            set({ hospitals: response.data });
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    },
    resetHospitals: () => set({ hospitals: undefined }),
}));

export function useHospitals() {
    const { hospitals, fetchHospitals, resetHospitals } = useHospitalStore();

    useEffect(() => {
        fetchHospitals();
    }, [fetchHospitals]);

    return { hospitals, resetHospitals };
}
