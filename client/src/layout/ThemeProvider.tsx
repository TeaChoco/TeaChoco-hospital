//-Path: "TeaChoco-Hospital/client/src/layout/ThemeProvider.tsx"
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { darkModeAtom } from '../context/theme';

export default function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const isDark = useAtomValue(darkModeAtom);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    return <>{children}</>;
}
