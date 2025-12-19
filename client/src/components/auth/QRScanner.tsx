//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import Paper from '../custom/Paper';
import Activity from '../custom/Activity';
import { useAuth } from '../../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

export default function QRScanner() {
    const [result, setResult] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const codeReader = useRef<BrowserQRCodeReader>(null);
    const [error, setError] = useState<string | null>(null);
    // const { setLoading, setError: setAuthError } = useAuth();

    useEffect(() => {
        return () => stopScanner();
    }, []);

    const startScanner = async () => {
        try {
            codeReader.current = new BrowserQRCodeReader();
            const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

            console.log(videoInputDevices);

            const videoInputDevice = videoInputDevices.find((device) =>
                device.label.includes('environment'),
            );

            if (!videoInputDevice) return setError('ไม่พบกล้องหลัง');

            await codeReader.current.decodeFromVideoDevice(
                videoInputDevice.deviceId,
                videoRef.current ?? undefined,
                (result, error) => {
                    console.log('result: ', result);
                    console.log('error: ', error);

                    // if (result) {
                    //     setResult(result.getText());
                    //     stopScanner();
                    // }
                    // if (error && error.name !== 'NotFoundException') {
                    //     console.error(error);
                    //     setError('เกิดข้อผิดพลาดในการสแกน');
                    // }
                },
            );

            // // เลือกกล้องหลัง (environment) ถ้ามี
            // const constraints = {
            //     video: {
            //         facingMode: { ideal: 'environment' },
            //     },
            // };

            // await codeReader.current.decodeFromVideoDevice(
            //     undefined,
            //     videoRef.current ?? undefined,
            //     (result, error) => {
            //         console.log(result);

            //         if (result) {
            //             setResult(result.getText());
            //             stopScanner();
            //         }
            //         if (error && error.name !== 'NotFoundException') {
            //             console.error(error);
            //             setError('เกิดข้อผิดพลาดในการสแกน');
            //         }
            //     },
            // );
            setIsScanning(true);
        } catch (err) {
            const errorMessage = 'Cannot access camera';
            setError(errorMessage);
        }
    };

    const stopScanner = () => {
        if (codeReader.current) {
            codeReader.current = null;
        }
        setIsScanning(false);
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

                <div className="absolute inset-0 border-2 border-white dark:border-gray-800 border-dashed rounded-lg pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-green-400 dark:border-green-600 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            <Activity visible={error}>
                <div className="bg-red-50 border border-red-200 dark:bg-red-600 dark:border-red-600 rounded-lg p-3 mb-4">
                    <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
                </div>
            </Activity>

            {!isScanning ? (
                <button onClick={startScanner} className="btn btn-primary w-full">
                    Start Scanner
                </button>
            ) : (
                <button onClick={stopScanner} className="btn btn-error w-full">
                    Stop Scanner
                </button>
            )}

            <p className="text-sm text-gray-600 mt-3 text-center">
                Point your camera at the QR code to login
            </p>
        </Paper>
    );
}
