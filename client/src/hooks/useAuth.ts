//-Path: "TeaChoco-Hospital/client/src/hooks/useAuth.ts"
import { useAtom } from 'jotai';
import { authAPI } from '../services/auth';
import { useState, useEffect } from 'react';
import { userAtom } from '../context/userAtom';
import type { AxiosError } from 'axios';

export const useAuth = () => {
    const [user, setUser] = useAtom(userAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isAuthenticated = user !== null && user !== undefined;

    const fetchAuth = async () => {
        setLoading(true);
        try {
            const res = await authAPI.auth();
            setUser(res.data);
        } catch (error) {
            if ((error as AxiosError).status !== 401) {
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
        setUser(null);
    };

    return {
        user,
        error,
        loading,
        signout,
        setError,
        setLoading,
        isAuthenticated,
    };
};
