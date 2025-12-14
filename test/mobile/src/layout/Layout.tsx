//-Path: "TeaChoco-Hospital/client/src/layout/Layout.tsx"
import { View, Text } from 'react-native';
import Navbar from '../components/Navbar';
import Background from './Background';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 flex-col">
                <Background />
                <Navbar />
                <View className="flex-1 p-4">{children}</View>
                <View className="py-4 border-t border-border-light dark:border-border-dark">
                    <Text className="text-center text-text-muted-light dark:text-text-muted-dark">
                        © 2024 TeaChoco Hospital
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
