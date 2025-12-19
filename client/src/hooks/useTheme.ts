//-Path: "TeaChoco-Hospital/client/src/hooks/useTheme.ts"
import { useAtom } from 'jotai';
import { themeModeAtom } from '../context/theme';

export function useTheme() {
    const [theme, setTheme] = useAtom(themeModeAtom);

    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return { theme, setTheme, toggleTheme };
}
