//-Path: "TeaChoco-Hospital/client/src/hooks/useTheme.ts"
import { useAtom } from 'jotai';
import { darkModeAtom } from '../context/themeAtom';

export function useTheme() {
    const [isDark, setIsDark] = useAtom(darkModeAtom);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return { isDark, setIsDark, toggleTheme };
}
