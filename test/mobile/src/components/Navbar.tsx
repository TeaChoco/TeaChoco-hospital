//-Path: "TeaChoco-Hospital/client/src/components/Navbar.tsx"
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ThemeToggle from './ThemeToggle';

type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
};

export default function Navbar() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View className="flex-row items-center justify-between px-4 py-4 bg-bg-light/80 dark:bg-bg-dark/80 border-b border-border-light dark:border-border-dark">
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text className="text-2xl font-bold text-primary">
                    TeaChoco Hospital
                </Text>
            </Pressable>
            <View className="flex-row items-center gap-2">
                <Pressable
                    onPress={() => navigation.navigate('Signin')}
                    className="bg-primary px-4 py-2 rounded-lg"
                >
                    <Text className="text-white font-medium">Login</Text>
                </Pressable>
                <ThemeToggle />
            </View>
        </View>
    );
}
