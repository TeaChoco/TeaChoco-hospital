//-Path: "TeaChoco-Hospital/client/src/components/ThemeToggle.tsx"
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, mounted, toggleTheme } = useTheme();

    if (!mounted)
        return <View className="h-8 w-14 rounded-full bg-slate-200" />;

    return (
        <Pressable
            onPress={toggleTheme}
            accessibilityLabel="Toggle Theme"
            className={`relative h-8 w-14 rounded-full ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-sky-200'
            }`}
        >
            <View
                className={`absolute left-1 top-1 h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
            >
                {theme === 'dark' ? (
                    <Ionicons name="moon" size={16} color="#1e293b" />
                ) : (
                    <Ionicons name="sunny" size={16} color="#f97316" />
                )}
            </View>
        </Pressable>
    );
}
