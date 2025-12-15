//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

interface QRGeneratorProps {
    onError?: (error: string) => void;
    onGenerate?: (qrData: string) => void;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ onGenerate }) => {
    const [qrData, setQrData] = useState<string>('');
    const [sessionId] = useState(() => 'session-' + Math.random().toString(36).substr(2, 9));

    useEffect(() => {
        // สร้าง QR data สำหรับการล็อกอิน
        const loginData = {
            sessionId,
            timestamp: Date.now(),
            type: 'login' as const,
            app: 'teachoco-hospital',
        };

        const dataString = JSON.stringify(loginData);
        setQrData(dataString);
        onGenerate?.(dataString);

        // จำลองการตรวจสอบสถานะ session ทุก 5 วินาที
        const interval = setInterval(() => {
            checkSessionStatus();
        }, 5000);

        return () => clearInterval(interval);
    }, [sessionId, onGenerate]);

    const checkSessionStatus = async () => {
        try {
            // จำลองการตรวจสอบสถานะ session จาก backend
            const response = await fetch(`/api/auth/session-status/${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.authenticated) {
                    alert('Login successful via QR code!');
                    // ปิด QR generator หรือ redirect
                }
            }
        } catch (error) {
            console.error('Error checking session status:', error);
        }
    };

    const refreshQR = () => {
        const newSessionId = 'session-' + Math.random().toString(36).substr(2, 9);
        const loginData = {
            sessionId: newSessionId,
            timestamp: Date.now(),
            type: 'login' as const,
            app: 'teachoco-hospital',
        };

        const dataString = JSON.stringify(loginData);
        setQrData(dataString);
        onGenerate?.(dataString);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Scan to Login
                </h3>

                <div className="flex justify-center mb-4">
                    {qrData ? (
                        <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                            <QRCodeSVG value={qrData} size={200} level="M" includeMargin />
                        </div>
                    ) : (
                        <div className="w-52 h-52 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Generating QR...</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={refreshQR}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Refresh QR Code
                    </button>
                    <button
                        onClick={() => {
                            // แสดงข้อมูล QR สำหรับ manual input
                            alert(`QR Data: ${qrData}`);
                        }}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                        Show QR Data
                    </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 text-center">
                        Use your mobile app to scan this QR code for quick login
                    </p>
                </div>

                <div className="mt-3 text-xs text-gray-500 text-center">
                    <p>Session ID: {sessionId}</p>
                    <p>Valid for 5 minutes</p>
                </div>
            </div>
        </div>
    );
};

export default QRGenerator;
