//-Path: "TeaChoco-Hospital/client/src/store/useMedicineStore.ts"
import { create } from 'zustand';
import { useEffect } from 'react';
import { medicineAPI } from '../services/api';
import type { Medicine } from '../types/medicine';

interface MedicineState {
    medicines: Medicine[] | undefined;
    setMedicines: (medicines: Medicine[] | undefined) => void;
    fetchMedicines: () => Promise<void>;
    resetMedicines: () => void;
}

export const useMedicineStore = create<MedicineState>((set, get) => ({
    medicines: undefined,
    setMedicines: (medicines) => set({ medicines }),
    fetchMedicines: async () => {
        if (get().medicines !== undefined) return;
        try {
            const response = await medicineAPI.findAll();
            set({ medicines: response.data });
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    },
    resetMedicines: () => set({ medicines: undefined }),
}));

export function useMedicines() {
    const { medicines, fetchMedicines, resetMedicines } = useMedicineStore();

    useEffect(() => {
        fetchMedicines();
    }, [fetchMedicines]);

    return { medicines, resetMedicines };
}
