//-Path: "TeaChoco-Hospital/client/src/store/useUserStore.ts"
import { create } from 'zustand';
import type { User } from '../types/auth';

interface UserState {
    user: User | null | undefined;
    loading: boolean;
    error: string | null;
    setUser: (user: User | null | undefined) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    loading: true,
    error: null,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
