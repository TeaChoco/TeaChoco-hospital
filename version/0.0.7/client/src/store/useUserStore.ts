//-Path: "TeaChoco-Hospital/client/src/store/useUserStore.ts"
import { create } from 'zustand';
import { useEffect } from 'react';
import type { User } from '../types/auth';
import { userAPI } from '../services/user';

interface UserState {
    user: User | null | undefined;
    allUsers: User[] | undefined;
    loading: boolean;
    error: string | null;
    setUser: (user: User | null | undefined) => void;
    setAllUsers: (users: User[] | undefined) => void;
    fetchAllUsers: () => Promise<void>;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: undefined,
    allUsers: undefined,
    loading: true,
    error: null,
    setUser: (user) => set({ user }),
    setAllUsers: (allUsers) => set({ allUsers }),
    fetchAllUsers: async () => {
        if (get().allUsers !== undefined) return;
        try {
            const response = await userAPI.findAll({
                name: true,
                email: true,
                picture: true,
            });
            set({ allUsers: response.data || [] });
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export function useAllUsers() {
    const { allUsers, fetchAllUsers } = useUserStore();

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return { allUsers };
}
