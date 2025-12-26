//-Path: "TeaChoco-Hospital/client/src/context/theme.ts"
import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage<boolean>(
    'darkMode',
    localStorage.getItem('darkMode') === 'true',
    {
        getItem: (key) => {
            const value = localStorage.getItem(key);
            if (value === null) {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                localStorage.setItem(key, isDark ? 'true' : 'false');
                return isDark;
            }
            return value === 'true';
        },
        setItem: (key, value) => localStorage.setItem(key, value ? 'true' : 'false'),
        removeItem: (key) => localStorage.removeItem(key),
    },
);
