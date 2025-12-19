//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import Paper from '../custom/Paper';
import Activity from '../custom/Activity';
import { useAuth } from '../../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

export default function QRScanner() {
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
                scanQRCode();
            }
        } catch (err) {
            const errorMessage = 'Cannot access camera';
            setError(errorMessage);
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

                setTimeout(() => {
                    const QRData =
                        '{"sessionId":"qr-session-123","timestamp":' +
                        Date.now() +
                        ',"type":"login"}';
                    handleQRScanSuccess(QRData);
                }, 2000);
            }

            if (isScanning) requestAnimationFrame(scanFrame);
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
            } else {
                throw new Error('QR login failed');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'QR login failed';
            setAuthError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                Scan QR Code
            </h3>

            <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
                <video
                    ref={videoRef}
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute inset-0 border-2 border-white dark:border-gray-800 border-dashed rounded-lg pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-green-400 dark:border-green-600 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            <Activity visible={error}>
                <div className="bg-red-50 border border-red-200 dark:bg-red-600 dark:border-red-600 rounded-lg p-3 mb-4">
                    <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
                </div>
            </Activity>

            <div className="flex gap-3">
                {!isScanning ? (
                    <button onClick={startScanner} className="btn flex-1 btn-primary">
                        Start Scanner
                    </button>
                ) : (
                    <button onClick={stopScanner} className="btn flex-1 btn-error">
                        Stop Scanner
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-600 mt-3 text-center">
                Point your camera at the QR code to login
            </p>
        </Paper>
    );
}
