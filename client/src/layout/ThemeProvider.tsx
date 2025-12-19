//-Path: "TeaChoco-Hospital/client/src/layout/ThemeProvider.tsx"
import { useAtom } from 'jotai';
import { themeModeAtom } from '../context/theme';
import { type ReactNode, useEffect } from 'react';

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useAtom(themeModeAtom);

    useEffect(() => {
        const saved = localStorage.getItem('themeMode') as any;
        if (saved) setTheme(saved);
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    }, [setTheme]);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');

        localStorage.setItem('themeMode', theme);
    }, [theme]);

    return <>{children}</>;
}
