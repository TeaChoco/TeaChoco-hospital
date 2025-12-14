//-Path: "TeaChoco-Hospital/client/src/hooks/useTheme.ts"
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'themeMode';

export function useTheme() {
    const [theme, setTheme] = useState<ThemeMode>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved === 'light' || saved === 'dark') setTheme(saved);
                else if (Appearance.getColorScheme() === 'dark')
                    setTheme('dark');
            } catch (error) {
                console.error('Error loading theme:', error);
            }
            setMounted(true);
        };
        loadTheme();
    }, []);

    useEffect(() => {
        if (!mounted) return;
        AsyncStorage.setItem(STORAGE_KEY, theme).catch(console.error);
    }, [theme, mounted]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return { theme, mounted, toggleTheme };
}
