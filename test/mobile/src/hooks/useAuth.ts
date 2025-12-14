//-Path: "TeaChoco-Hospital/client/src/hooks/useAuth.ts"
import { useState, useEffect } from 'react';
import type { AuthState, User } from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false,
        isAuthenticated: false,
    });

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const token = await AsyncStorage.getItem(TOKEN_KEY);
                const userData = await AsyncStorage.getItem(USER_KEY);

                if (token && userData) {
                    const user: User = JSON.parse(userData);
                    setAuthState({
                        user,
                        loading: false,
                        error: null,
                        isAuthenticated: true,
                    });
                }
            } catch (error) {
                await AsyncStorage.removeItem(TOKEN_KEY);
                await AsyncStorage.removeItem(USER_KEY);
            }
        };
        loadAuth();
    }, []);

    const login = async (user: User, token: string) => {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        setAuthState({
            user,
            loading: false,
            error: null,
            isAuthenticated: true,
        });
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);
        setAuthState({
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,
        });
    };

    const setLoading = (loading: boolean) =>
        setAuthState((prev) => ({ ...prev, loading }));

    const setError = (error: string | null) =>
        setAuthState((prev) => ({ ...prev, error }));

    return {
        login,
        logout,
        setError,
        setLoading,
        ...authState,
    };
}
