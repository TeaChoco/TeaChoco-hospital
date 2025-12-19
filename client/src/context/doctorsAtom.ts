//-Path: "TeaChoco-Hospital/client/src/context/doctorsAtom.ts"
import { atom, useAtom } from 'jotai';
import { doctorAPI } from '../services/api';
import type { Doctor } from '../types/doctor';
import { useCallback, useEffect } from 'react';

export const doctorsAtom = atom<Doctor[] | undefined>(undefined);

export function useDoctors() {
    const [doctors, setDoctors] = useAtom(doctorsAtom);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await doctorAPI.findAll();
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        if (doctors === undefined) fetchDoctors();
    }, [doctors]);

    const resetDoctors = useCallback(() => setDoctors(undefined), []);

    return { doctors, resetDoctors };
}
