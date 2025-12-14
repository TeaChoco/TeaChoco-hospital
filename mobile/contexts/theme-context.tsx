//-Path: "TeaChoco-Hospital/client/contexts/theme-context.tsx"
import { Colors } from '@/constants/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    colors: typeof Colors.light;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
    initialMode?: ThemeMode;
}

/**
 * Theme provider component that manages app theme state
 */
export function ThemeProvider({ children, initialMode = 'light' }: ThemeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>(initialMode);

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const setTheme = useCallback((newMode: ThemeMode) => {
        setMode(newMode);
    }, []);

    const value = useMemo(
        () => ({
            mode,
            colors: Colors[mode],
            isDark: mode === 'dark',
            toggleTheme,
            setTheme,
        }),
        [mode, toggleTheme, setTheme],
    );

    const emotionTheme = useMemo(
        () => ({
            mode,
            colors: Colors[mode],
            isDark: mode === 'dark',
        }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={value}>
            <EmotionThemeProvider theme={emotionTheme}>{children}</EmotionThemeProvider>
        </ThemeContext.Provider>
    );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}
