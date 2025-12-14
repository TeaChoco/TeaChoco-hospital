//-Path: "TeaChoco-Hospital/client/src/hooks/useAuth.ts"
import { useState, useEffect } from 'react';
import type { AuthState, User } from '../types/auth';

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
    });

    // ตรวจสอบ token เมื่อ component ถูก mount
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
            try {
                const user: User = JSON.parse(userData);
                setAuthState({
                    isAuthenticated: true,
                    user,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
            }
        }
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
        });
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');

        setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
        });
    };

    const setLoading = (loading: boolean) => {
        setAuthState((prev) => ({ ...prev, loading }));
    };

    const setError = (error: string | null) => {
        setAuthState((prev) => ({ ...prev, error }));
    };

    return {
        ...authState,
        login,
        logout,
        setLoading,
        setError,
    };
};
