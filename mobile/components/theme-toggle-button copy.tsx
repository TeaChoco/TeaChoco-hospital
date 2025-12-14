//-Path: "TeaChoco-Hospital/client/components/theme-toggle-button.tsx"
import styled from '@emotion/native';
import { useTheme } from '@/contexts/theme-context';
import { Pressable, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ThemeToggleButtonProps {
    size?: number;
    style?: StyleProp<ViewStyle>;
}

const IconText = styled.Text`
    font-size: 14px;
`;

/**
 * Animated theme toggle button component
 */
export function ThemeToggleButton({ size = 48, style }: ThemeToggleButtonProps) {
    const { isDark, toggleTheme } = useTheme();

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: withSpring(isDark ? '#3b82f6' : '#e5e7eb'),
    }));

    const toggleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(isDark ? size - 4 : 0, {
                    damping: 15,
                    stiffness: 120,
                }),
            },
        ],
    }));

    return (
        <Pressable onPress={toggleTheme} style={style}>
            <Animated.View
                style={[
                    styles.container,
                    { width: size * 2, height: size, borderRadius: size / 2 },
                    containerStyle,
                ]}>
                <Animated.View
                    style={[
                        styles.toggle,
                        { width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 },
                        toggleStyle,
                    ]}>
                    <IconText>{isDark ? '🌙' : '☀️'}</IconText>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        justifyContent: 'center',
    },
    toggle: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
