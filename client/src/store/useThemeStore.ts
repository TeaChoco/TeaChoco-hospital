//-Path: "TeaChoco-Hospital/client/src/store/useThemeStore.ts"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    toggleDarkMode: () => void;
}

const getInitialDarkMode = (): boolean => {
    const value = localStorage.getItem('darkMode');
    if (value === null) {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
        return isDark;
    }
    return value === 'true';
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            darkMode: getInitialDarkMode(),
            setDarkMode: (darkMode) => set({ darkMode }),
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        }),
        {
            name: 'darkMode',
        },
    ),
);
