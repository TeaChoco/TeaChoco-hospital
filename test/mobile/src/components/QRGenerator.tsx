//-Path: "TeaChoco-Hospital/client/src/components/QRGenerator.tsx"
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface QRGeneratorProps {
    onError?: (error: string) => void;
    onGenerate?: (qrData: string) => void;
}

export default function QRGenerator({ onGenerate, onError }: QRGeneratorProps) {
    const [qrData, setQrData] = useState<string>('');
    const [sessionId] = useState(
        () => 'session-' + Math.random().toString(36).substr(2, 9),
    );

    useEffect(() => {
        const loginData = {
            sessionId,
            type: 'login' as const,
            timestamp: Date.now(),
            app: 'teachoco-hospital',
        };

        const dataString = JSON.stringify(loginData);
        setQrData(dataString);
        onGenerate?.(dataString);
    }, [sessionId, onGenerate]);

    const refreshQR = () => {
        const newSessionId =
            'session-' + Math.random().toString(36).substr(2, 9);
        const loginData = {
            timestamp: Date.now(),
            type: 'login' as const,
            sessionId: newSessionId,
            app: 'teachoco-hospital',
        };

        const dataString = JSON.stringify(loginData);
        setQrData(dataString);
        onGenerate?.(dataString);
    };

    return (
        <View className="w-full max-w-sm mx-auto">
            <View className="bg-white rounded-lg shadow-lg p-6">
                <Text className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Scan to Login
                </Text>

                <View className="items-center mb-4">
                    {qrData ? (
                        <View className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                            <View className="w-52 h-52 bg-gray-100 items-center justify-center">
                                <Text className="text-gray-500 text-center text-sm">
                                    QR Code{'\n'}(Install
                                    react-native-qrcode-svg)
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View className="w-52 h-52 bg-gray-200 rounded-lg items-center justify-center">
                            <Text className="text-gray-500">
                                Generating QR...
                            </Text>
                        </View>
                    )}
                </View>

                <View className="gap-2">
                    <Pressable
                        onPress={refreshQR}
                        className="w-full bg-blue-600 py-2 px-4 rounded-lg"
                    >
                        <Text className="text-white text-center font-medium">
                            Refresh QR Code
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => alert(`QR Data: ${qrData}`)}
                        className="w-full bg-gray-600 py-2 px-4 rounded-lg"
                    >
                        <Text className="text-white text-center font-medium">
                            Show QR Data
                        </Text>
                    </Pressable>
                </View>

                <View className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <Text className="text-sm text-blue-700 text-center">
                        Use your mobile app to scan this QR code for quick login
                    </Text>
                </View>

                <View className="mt-3">
                    <Text className="text-xs text-gray-500 text-center">
                        Session ID: {sessionId}
                    </Text>
                    <Text className="text-xs text-gray-500 text-center">
                        Valid for 5 minutes
                    </Text>
                </View>
            </View>
        </View>
    );
}
