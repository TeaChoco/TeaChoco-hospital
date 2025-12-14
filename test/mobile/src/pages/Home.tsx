//-Path: "TeaChoco-Hospital/client/src/pages/Home.tsx"
import {
    View,
    Text,
    Pressable,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '../layout/Layout';

type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
};

interface FeatureCardProps {
    title: string;
    color: string;
    description: string;
}

function FeatureCard({ title, description, color }: FeatureCardProps) {
    return (
        <View className="bg-bg-card-light dark:bg-bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6">
            <Text className={`text-xl font-semibold mb-2`} style={{ color }}>
                {title}
            </Text>
            <Text className="text-text-muted-light dark:text-text-muted-dark">
                {description}
            </Text>
        </View>
    );
}

export default function Home() {
    const { width } = useWindowDimensions();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const isTablet = width >= 640;
    const isDesktop = width >= 1024;

    return (
        <Layout>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="flex-1 items-center justify-center p-6">
                    <View className="max-w-4xl w-full items-center">
                        <Text className="text-4xl md:text-6xl font-bold text-center mb-4 text-text-light dark:text-text-dark">
                            Welcome to{' '}
                            <Text className="text-primary">
                                TeaChoco Hospital
                            </Text>
                        </Text>

                        <Text className="text-lg text-text-secondary-light dark:text-text-secondary-dark text-center max-w-2xl mb-8">
                            Experience modern healthcare management with a touch
                            of elegance. Secure, fast, and user-friendly.
                        </Text>

                        <View
                            className={`flex-row gap-4 mb-12 ${
                                isTablet ? 'flex-row' : 'flex-col w-full'
                            }`}
                        >
                            <Pressable
                                onPress={() => navigation.navigate('Signin')}
                                className="bg-primary px-6 py-3 rounded-lg shadow-lg"
                            >
                                <Text className="text-white font-medium text-lg text-center">
                                    Get Started
                                </Text>
                            </Pressable>
                            <Pressable className="border border-border-light dark:border-border-dark px-6 py-3 rounded-lg">
                                <Text className="text-text-light dark:text-text-dark font-medium text-lg text-center">
                                    Learn More
                                </Text>
                            </Pressable>
                        </View>

                        <View
                            className={`w-full gap-4 ${
                                isDesktop
                                    ? 'flex-row'
                                    : isTablet
                                    ? 'flex-row flex-wrap'
                                    : 'flex-col'
                            }`}
                        >
                            <View
                                className={
                                    isDesktop
                                        ? 'flex-1'
                                        : isTablet
                                        ? 'w-[48%]'
                                        : 'w-full'
                                }
                            >
                                <FeatureCard
                                    color="#22c55e"
                                    title="Smart Management"
                                    description="Efficient patient tracking and hospital resource optimization using AI-driven insights."
                                />
                            </View>
                            <View
                                className={
                                    isDesktop
                                        ? 'flex-1'
                                        : isTablet
                                        ? 'w-[48%]'
                                        : 'w-full'
                                }
                            >
                                <FeatureCard
                                    color="#0ea5e9"
                                    title="Secure Access"
                                    description="Enterprise-grade security with multi-factor authentication and role-based access control."
                                />
                            </View>
                            <View
                                className={
                                    isDesktop
                                        ? 'flex-1'
                                        : isTablet
                                        ? 'w-[48%]'
                                        : 'w-full'
                                }
                            >
                                <FeatureCard
                                    color="#15803d"
                                    title="24/7 Support"
                                    description="Round-the-clock technical support to ensure your hospital operations never stop."
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
}
