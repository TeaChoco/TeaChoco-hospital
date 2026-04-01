//-Path: "TeaChoco-Hospital/client/src/layout/ThemeProvider.tsx"
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const { isDark } = useTheme();

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    return <>{children}</>;
}
