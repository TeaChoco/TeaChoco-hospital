//-Path: "TeaChoco-Hospital/client/src/layout/Background.tsx"
import { View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function Background() {
    const { theme } = useTheme();

    return (
        <View
            className={`absolute inset-0 w-full h-full -z-10 ${
                theme === 'dark' ? 'bg-bg-dark' : 'bg-bg-light'
            }`}
        />
    );
}
