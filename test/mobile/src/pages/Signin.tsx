//-Path: "TeaChoco-Hospital/client/src/pages/Signin.tsx"
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import Background from '../layout/Background';
import QRScanner from '../components/QRScanner';
import ThemeToggle from '../components/ThemeToggle';
import QRGenerator from '../components/QRGenerator';
import GoogleSignin from '../components/GoogleSignin';

type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
};

type TabType = 'google' | 'scan' | 'generate';

export default function Signin() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { isAuthenticated, user, loading, error, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('google');

    const handleGoBack = () => navigation.goBack();

    if (isAuthenticated && user) {
        return (
            <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
                <Background />
                <View className="absolute top-4 right-4 z-50">
                    <ThemeToggle />
                </View>
                <View className="flex-1 items-center justify-center p-4">
                    <View className="max-w-md w-full bg-bg-card-light dark:bg-bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6">
                        <View className="items-center mb-6">
                            <Text className="text-2xl font-bold text-primary mb-2">
                                Welcome back!
                            </Text>
                            <Text className="text-text-secondary-light dark:text-text-secondary-dark">
                                You are logged in successfully
                            </Text>
                        </View>

                        <View className="bg-bg-card-hover-light dark:bg-bg-card-hover-dark rounded-lg p-4 mb-6">
                            <View className="flex-row items-center gap-3">
                                {user.avatar && (
                                    <Image
                                        source={{ uri: user.avatar }}
                                        className="w-12 h-12 rounded-full border-2 border-primary"
                                    />
                                )}
                                <View>
                                    <Text className="font-semibold text-text-light dark:text-text-dark">
                                        {user.name}
                                    </Text>
                                    <Text className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                        {user.email}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Pressable
                            onPress={logout}
                            className="bg-red-500 py-3 px-4 rounded-lg"
                        >
                            <Text className="text-white text-center font-medium">
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
            <Background />
            <View className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </View>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    padding: 16,
                }}
            >
                <View className="max-w-lg w-full mx-auto bg-bg-card-light dark:bg-bg-card-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
                    {/* Header */}
                    <View className="bg-primary p-8 relative">
                        <Pressable
                            onPress={handleGoBack}
                            className="absolute top-4 left-4 p-2"
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="white"
                            />
                        </Pressable>
                        <Text className="text-3xl font-bold text-white text-center mb-2">
                            TeaChoco Hospital
                        </Text>
                        <Text className="text-white/80 text-center">
                            Please sign in to continue
                        </Text>
                    </View>

                    {/* Tabs */}
                    <View className="flex-row border-b border-border-light dark:border-border-dark">
                        {(['google', 'scan', 'generate'] as TabType[]).map(
                            (tab) => (
                                <Pressable
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 px-6 ${
                                        activeTab === tab
                                            ? 'border-b-2 border-primary'
                                            : ''
                                    }`}
                                >
                                    <Text
                                        className={`text-center font-medium ${
                                            activeTab === tab
                                                ? 'text-primary'
                                                : 'text-text-muted-light dark:text-text-muted-dark'
                                        }`}
                                    >
                                        {tab === 'google'
                                            ? 'Google'
                                            : tab === 'scan'
                                            ? 'Scan QR'
                                            : 'Generate QR'}
                                    </Text>
                                </Pressable>
                            ),
                        )}
                    </View>

                    {/* Content */}
                    <View className="p-8 bg-bg-card-light dark:bg-bg-card-dark">
                        {loading && (
                            <View className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
                                <Text className="text-primary-dark font-medium text-center">
                                    Signing in...
                                </Text>
                            </View>
                        )}

                        {error && (
                            <View className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <Text className="text-red-600 dark:text-red-400 font-medium">
                                    {error}
                                </Text>
                            </View>
                        )}

                        {activeTab === 'google' && (
                            <View className="items-center">
                                <Text className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Sign in with Google
                                </Text>
                                <GoogleSignin
                                    onSuccess={() =>
                                        console.log('Google login successful')
                                    }
                                    onError={(err) =>
                                        console.error(
                                            'Google login error:',
                                            err,
                                        )
                                    }
                                />
                            </View>
                        )}

                        {activeTab === 'scan' && (
                            <View>
                                <Text className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Scan QR Code
                                </Text>
                                <QRScanner
                                    onScanSuccess={(data) =>
                                        console.log('QR scan successful:', data)
                                    }
                                    onScanError={(err) =>
                                        console.error('QR scan error:', err)
                                    }
                                />
                            </View>
                        )}

                        {activeTab === 'generate' && (
                            <View>
                                <Text className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Generate QR Code
                                </Text>
                                <QRGenerator
                                    onGenerate={(qrData) =>
                                        console.log('QR generated:', qrData)
                                    }
                                    onError={(err) =>
                                        console.error(
                                            'QR generation error:',
                                            err,
                                        )
                                    }
                                />
                            </View>
                        )}

                        {/* Footer */}
                        <View className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                            <Text className="text-center text-sm text-text-muted-light dark:text-text-muted-dark">
                                Choose your preferred login method above
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
