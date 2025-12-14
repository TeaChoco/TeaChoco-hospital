//-Path: "TeaChoco-Hospital/client/app/_layout.tsx"
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/contexts/theme-context';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider initialMode={colorScheme ?? 'light'}>
            <NavThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="modal"
                        options={{ presentation: 'modal', title: 'Modal' }}
                    />
                </Stack>
                <StatusBar style="auto" />
            </NavThemeProvider>
        </ThemeProvider>
    );
}
