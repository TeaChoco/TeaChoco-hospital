//-Path: "TeaChoco-Hospital/client/src/hooks/useTheme.ts"
import { useThemeStore } from '../store/useThemeStore';

export function useTheme() {
    const { darkMode, setDarkMode, toggleDarkMode } = useThemeStore();

    return { isDark: darkMode, setIsDark: setDarkMode, toggleTheme: toggleDarkMode };
}
