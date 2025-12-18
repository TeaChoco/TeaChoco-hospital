//-Path: "TeaChoco-Hospital/client/src/context/medicinesAtom.ts"
import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { medicineAPI } from '../services/api';
import type { Medicine } from '../types/medicine';

export const medicinesAtom = atom<Medicine[] | undefined>(undefined);

export function useMedicines() {
    const [medicines, setMedicines] = useAtom(medicinesAtom);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await medicineAPI.findAll();
                setMedicines(response.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };
        if (medicines === undefined) fetchMedicines();
    }, [medicines]);

    return medicines;
}
