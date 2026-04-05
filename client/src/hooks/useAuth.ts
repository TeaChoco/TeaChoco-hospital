//-Path: "TeaChoco-Hospital/client/src/hooks/useAuth.ts"
import type { AxiosError } from 'axios';
import { authAPI } from '../services/auth';
import { useEffect, useMemo, useCallback } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useDoctorStore } from '../store/useDoctorStore';
import { useHospitalStore } from '../store/useHospitalStore';
import { useMedicineStore } from '../store/useMedicineStore';
import { useAppointmentStore } from '../store/useAppointmentStore';

export function useAuth() {
    const { resetDoctors } = useDoctorStore();
    const { resetHospitals } = useHospitalStore();
    const { resetMedicines } = useMedicineStore();
    const { resetAppointments } = useAppointmentStore();
    const { user, error, loading, setUser, setError, setLoading } = useUserStore();
    const isAuthenticated = user !== null && user !== undefined;

    const fetchAuth = useCallback(async () => {
        setLoading(true);
        try {
            const response = await authAPI.auth();
            setUser(response.data);
        } catch (error) {
            if ((error as AxiosError).status === 401) setUser(null);
            else {
                if (error instanceof Error) setError(error.message);
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, [setUser, setError, setLoading]);

    useEffect(() => {
        if (user === undefined) fetchAuth();
    }, [user, fetchAuth]);

    const signout = useCallback(async () => {
        setLoading(true);
        await authAPI.signout();
        setLoading(false);
        setUser(undefined);
        resetAppointments();
        resetHospitals();
        resetMedicines();
        resetDoctors();
    }, [setUser, setLoading, resetDoctors, resetHospitals, resetMedicines, resetAppointments]);

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
        [user, error, loading, signout, setError, setLoading, isAuthenticated],
    );
}
