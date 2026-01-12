//-Path: "TeaChoco-Hospital/client/src/hooks/useAuth.ts"
import { useAtom } from 'jotai';
import type { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { authAPI } from '../services/auth';
import { useDoctors } from '../context/doctorsAtom';
import { useHospitals } from '../context/hospitalsAtom';
import { useMedicines } from '../context/medicinesAtom';
import { useAppointments } from '../context/appointmentsAtom';
import { userAtom, loadingUserAtom, errorUserAtom } from '../context/userAtom';

export function useAuth() {
    const { resetDoctors } = useDoctors();
    const [user, setUser] = useAtom(userAtom);
    const { resetHospitals } = useHospitals();
    const { resetMedicines } = useMedicines();
    const { resetAppointments } = useAppointments();
    const [error, setError] = useAtom(errorUserAtom);
    const [loading, setLoading] = useAtom(loadingUserAtom);
    const isAuthenticated = user !== null && user !== undefined;

    const fetchAuth = async () => {
        setLoading(true);
        try {
            const res = await authAPI.auth();
            setUser(res.data);
        } catch (error) {
            if ((error as AxiosError).status === 401) setUser(null);
            else {
                if (error instanceof Error) setError(error.message);
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user === undefined) fetchAuth();
    }, [user]);

    const signout = async () => {
        setLoading(true);
        await authAPI.signout();
        setLoading(false);
        setUser(undefined);
        resetAppointments();
        resetHospitals();
        resetMedicines();
        resetDoctors();
    };

    return useMemo(
        () => ({
            user,
            error,
            loading,
            signout,
            setError,
            setLoading,
            isAuthenticated,
        }),
        [user, error, loading, isAuthenticated],
    );
}
