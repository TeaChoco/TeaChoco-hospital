//-Path: "TeaChoco-Hospital/client/src/components/code/QRScanner.tsx"
import Input from '../custom/Input';
import Select from '../custom/Select';
import Activity from '../custom/Activity';
import { useState, useRef, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

export default function QRScanner({
    isDev,
    header,
    onScan,
    description,
}: {
    header: string;
    isDev?: boolean;
    description?: string;
    onScan?: (result: string) => void;
}) {
    const [result, setResult] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const codeReader = useRef<BrowserQRCodeReader>(null);
    const [error, setError] = useState<string | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

    const getDevices = async () => {
        try {
            setResult('');
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');

            setDevices(videoDevices);

            const backCamera = videoDevices.find(
                (device) =>
                    device.label.toLowerCase().includes('back') ||
                    device.label.toLowerCase().includes('environment') ||
                    device.label.toLowerCase().includes('rear'),
            );

            if (backCamera) setSelectedDeviceId(backCamera.deviceId);
            else if (videoDevices.length > 0) setSelectedDeviceId(videoDevices[0].deviceId);
        } catch (err) {
            console.error('Error getting devices:', err);
        }
    };

    useEffect(() => {
        getDevices();
        return () => stopScanner();
    }, []);

    useEffect(() => {
        if (result) onScan?.(result);
    }, [result]);

    const startScanner = async () => {
        try {
            setError(null);
            setResult('');

            codeReader.current = new BrowserQRCodeReader();
            if (!selectedDeviceId && devices.length === 0) return setError('ไม่พบอุปกรณ์กล้อง');

            await codeReader.current.decodeFromVideoDevice(
                selectedDeviceId || undefined,
                videoRef.current ?? undefined,
                (result, error) => {
                    if (result) setResult(result.getText());
                    setError(error?.message ?? null);
                },
            );
            setIsScanning(true);
        } catch (err) {
            const errorMessage = 'Cannot access camera';
            setError(errorMessage);
        }
    };

    const stopScanner = () => {
        if (codeReader.current) codeReader.current = null;
        setIsScanning(false);
    };

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                {header}
            </h3>

            <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
                <video
                    ref={videoRef}
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />

                {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                        <button
                            onClick={startScanner}
                            disabled={devices.length === 0}
                            className="btn h-full w-full shadow-xl">
                            Start Scanner
                        </button>
                    </div>
                )}

                <div className="absolute inset-0 border-2 border-white dark:border-gray-800 border-dashed rounded-lg pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-green-400 dark:border-green-600 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            <Activity visible={error}>
                <div className="bg-red-50 border border-red-200 dark:bg-red-600 dark:border-red-600 rounded-lg p-3 mb-4">
                    <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
                </div>
            </Activity>

            <div className="space-y-3">
                <Activity visible={result}>
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ข้อมูลที่สแกนได้:
                        </p>
                        <p className="text-green-700 dark:text-green-300 font-mono text-sm break-all">
                            {result}
                        </p>
                    </div>
                </Activity>

                <Select
                    label="เลือกกล้อง"
                    value={selectedDeviceId}
                    onChange={(event) => {
                        const deviceId = event.target.value;
                        setSelectedDeviceId(deviceId);
                        if (isScanning) {
                            stopScanner();
                            setTimeout(() => {
                                if (videoRef.current) startScanner();
                            }, 100);
                        }
                    }}
                    options={devices.map((device) => ({
                        label: device.label,
                        value: device.deviceId,
                    }))}>
                    {(Option, options) =>
                        options?.map((option) => <Option key={option.value} {...option} />)
                    }
                </Select>

                <button onClick={getDevices} className="btn btn-warning w-full">
                    Refresh
                </button>

                <p className="text-sm text-gray-600 text-center">{description}</p>

                <Activity visible={isDev}>
                    <Input
                        label="Result"
                        value={result}
                        onChange={(event) => setResult(event.target.value)}
                    />
                </Activity>
            </div>
        </>
    );
}
