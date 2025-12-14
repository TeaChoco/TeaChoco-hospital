//-Path: "TeaChoco-Hospital/client/components/theme-toggle-button.tsx"
import styled from '@emotion/native';
import { useTheme } from '@/contexts/theme-context';
import { Pressable, ViewStyle, StyleProp } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ThemeToggleButtonProps {
    size?: number;
    style?: StyleProp<ViewStyle>;
}

const Container = styled(Animated.View)<{ isDark: boolean; size: number }>(
    ({ theme, size, isDark }) => ({
        width: size * 2,
        height: size,
        borderRadius: size / 2,
        padding: 4,
        justifyContent: 'center',
        backgroundColor: isDark ? '#3b82f6' : '#e5e7eb2d',
    }),
);

const Toggle = styled(Animated.View)<{ size: number }>(({ theme, size }) => ({
    width: size - 8,
    height: size - 8,
    borderRadius: (size - 8) / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
}));

const IconText = styled.Text<{ isDark: boolean }>`
    font-size: 14px;
`;

export function ThemeToggleButton({ size = 48, style }: ThemeToggleButtonProps) {
    const { isDark, toggleTheme } = useTheme();

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
            <Container isDark={isDark} size={size}>
                <Toggle size={size} style={toggleStyle}>
                    <IconText isDark={isDark}>{isDark ? '🌙' : '☀️'}</IconText>
                </Toggle>
            </Container>
        </Pressable>
    );
}
