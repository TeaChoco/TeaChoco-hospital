//-Path: "TeaChoco-Hospital/client/src/components/GoogleSignin.tsx"
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

interface GoogleSigninProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function GoogleSignin({
    onSuccess,
    onError,
}: GoogleSigninProps) {
    const { login, setLoading, setError } = useAuth();

    const handleGoogleLogin = async () => {
        setLoading(true);

        try {
            const mockUser = {
                id: 'google-user-id',
                name: 'Google User',
                email: 'user@example.com',
                avatar: 'https://via.placeholder.com/150',
            };
            const mockToken = 'mock-jwt-token-from-google';

            await login(mockUser, mockToken);
            onSuccess?.();
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full max-w-sm">
            <Pressable
                onPress={handleGoogleLogin}
                className="flex-row items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 shadow-sm"
            >
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text className="text-gray-700 font-medium">
                    Sign in with Google
                </Text>
            </Pressable>
            <Text className="text-xs text-gray-500 text-center mt-2">
                (Demo mode - Install @react-native-google-signin for real auth)
            </Text>
        </View>
    );
}
