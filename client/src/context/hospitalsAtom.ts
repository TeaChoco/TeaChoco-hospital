//- Path: "TeaChoco-Hospital/client/src/context/hospitalsAtom.ts"
import { atom, useAtom } from 'jotai';
import { hospitalAPI } from '../services/api';
import { useCallback, useEffect } from 'react';
import type { Hospital } from '../types/hospital';

export const hospitalsAtom = atom<Hospital[] | undefined>(undefined);

export function useHospitals() {
    const [hospitals, setHospitals] = useAtom(hospitalsAtom);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await hospitalAPI.findAll();
                setHospitals(response.data);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };
        if (hospitals === undefined) fetchHospitals();
    }, [hospitals]);

    const resetHospitals = useCallback(() => setHospitals(undefined), []);

    return { hospitals, resetHospitals };
}
