//-Path: "TeaChoco-Hospital/client/src/hooks/useTheme.ts"
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<ThemeMode>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("themeMode") as ThemeMode | null;
        if (saved) setTheme(saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            setTheme("dark");
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");

        localStorage.setItem("themeMode", theme);
    }, [theme, mounted]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return { theme, mounted, toggleTheme };
}
