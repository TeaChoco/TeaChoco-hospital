//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import { useAuth } from '../../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

interface QRScannerProps {
    onScanSuccess?: (data: string) => void;
    onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanError, onScanSuccess }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setLoading, setError: setAuthError } = useAuth();

    useEffect(() => {
        return () => stopScanner();
    }, []);

    const startScanner = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsScanning(true);
                setError(null);

                // เริ่มการสแกน QR Code
                scanQRCode();
            }
        } catch (err) {
            const errorMessage = 'Cannot access camera';
            setError(errorMessage);
            onScanError?.(errorMessage);
        }
    };

    const stopScanner = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsScanning(false);
    };

    const scanQRCode = () => {
        if (!isScanning || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const scanFrame = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                // ใช้ jsqr สำหรับการสแกน QR Code
                // import jsqr from 'jsqr';
                // const code = jsqr(imageData.data, imageData.width, imageData.height);

                // จำลองการสแกน QR Code สำเร็จ
                setTimeout(() => {
                    const mockQRData =
                        '{"sessionId":"qr-session-123","timestamp":' +
                        Date.now() +
                        ',"type":"login"}';
                    handleQRScanSuccess(mockQRData);
                }, 2000);
            }

            if (isScanning) {
                requestAnimationFrame(scanFrame);
            }
        };

        scanFrame();
    };

    const handleQRScanSuccess = async (qrData: string) => {
        setLoading(true);
        stopScanner();

        try {
            // จำลองการส่ง QR data ไปยัง backend
            const response = await fetch('/api/auth/qr-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrData }),
            });

            if (response.ok) {
                // const data = await response.json();

                // จำลอง user data จาก QR login
                // const mockUser = {
                //     id: 'qr-user-id',
                //     email: 'qruser@example.com',
                //     name: 'QR User',
                // };

                // const mockToken = 'mock-jwt-token-from-qr-login';

                // login(mockUser, mockToken);
                onScanSuccess?.(qrData);
            } else {
                throw new Error('QR login failed');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'QR login failed';
            setAuthError(errorMessage);
            onScanError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* QR Scanner Overlay */}
                    <div className="absolute inset-0 border-2 border-white border-dashed rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-green-400 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex gap-3">
                    {!isScanning ? (
                        <button
                            onClick={startScanner}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Start Scanner
                        </button>
                    ) : (
                        <button
                            onClick={stopScanner}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                            Stop Scanner
                        </button>
                    )}

                    <button
                        onClick={() => {
                            // จำลอง manual QR code input
                            const manualQR = prompt('Enter QR code data:');
                            if (manualQR) {
                                handleQRScanSuccess(manualQR);
                            }
                        }}
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                        Manual Input
                    </button>
                </div>

                <p className="text-sm text-gray-600 mt-3 text-center">
                    Point your camera at the QR code to login
                </p>
            </div>
        </div>
    );
};

export default QRScanner;
