//-Path: "TeaChoco-Hospital/client/src/context/doctorsAtom.ts"
import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import type { Doctor } from '../types/doctor';
import { doctorAPI } from '../services/api';

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

    return doctors;
}
