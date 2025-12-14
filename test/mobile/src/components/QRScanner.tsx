//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface QRScannerProps {
    onScanSuccess?: (data: string) => void;
    onScanError?: (error: string) => void;
}

export default function QRScanner({
    onScanError,
    onScanSuccess,
}: QRScannerProps) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [manualInput, setManualInput] = useState('');
    const { login, setLoading, setError: setAuthError } = useAuth();

    const startScanner = () => {
        setIsScanning(true);
        setError(null);
        Alert.alert(
            'Camera Permission',
            'Camera scanning requires expo-camera. Using manual input for now.',
        );
    };

    const stopScanner = () => setIsScanning(false);

    const handleQRScanSuccess = async (qrData: string) => {
        setLoading(true);
        stopScanner();

        try {
            const mockUser = {
                id: 'qr-user-id',
                name: 'QR User',
                email: 'qruser@example.com',
            };
            const mockToken = 'mock-jwt-token-from-qr-login';

            await login(mockUser, mockToken);
            onScanSuccess?.(qrData);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'QR login failed';
            setAuthError(errorMessage);
            onScanError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleManualSubmit = () => {
        if (manualInput.trim()) handleQRScanSuccess(manualInput.trim());
    };

    return (
        <View className="w-full max-w-md mx-auto">
            <View className="bg-white rounded-lg shadow-lg p-6">
                <View className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4 items-center justify-center">
                    {isScanning ? (
                        <Text className="text-white text-center">
                            Camera Preview{'\n'}(Install expo-camera for real
                            scanning)
                        </Text>
                    ) : (
                        <Text className="text-gray-400 text-center">
                            Tap Start Scanner to begin
                        </Text>
                    )}
                </View>

                {error && (
                    <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <Text className="text-red-700 text-sm">{error}</Text>
                    </View>
                )}

                <View className="flex-row gap-3 mb-4">
                    {!isScanning ? (
                        <Pressable
                            onPress={startScanner}
                            className="flex-1 bg-blue-600 py-2 px-4 rounded-lg"
                        >
                            <Text className="text-white text-center font-medium">
                                Start Scanner
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            onPress={stopScanner}
                            className="flex-1 bg-red-600 py-2 px-4 rounded-lg"
                        >
                            <Text className="text-white text-center font-medium">
                                Stop Scanner
                            </Text>
                        </Pressable>
                    )}
                </View>

                <View className="border-t border-gray-200 pt-4">
                    <Text className="text-sm text-gray-600 mb-2 text-center">
                        Or enter QR code manually:
                    </Text>
                    <TextInput
                        value={manualInput}
                        onChangeText={setManualInput}
                        placeholder="Enter QR code data"
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
                    />
                    <Pressable
                        onPress={handleManualSubmit}
                        className="bg-gray-600 py-2 px-4 rounded-lg"
                    >
                        <Text className="text-white text-center font-medium">
                            Submit Manual Input
                        </Text>
                    </Pressable>
                </View>

                <Text className="text-sm text-gray-600 mt-3 text-center">
                    Point your camera at the QR code to login
                </Text>
            </View>
        </View>
    );
}
