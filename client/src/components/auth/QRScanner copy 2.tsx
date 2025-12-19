//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import Paper from '../custom/Paper';
import { QrReader } from 'react-qr-reader';
import Activity from '../custom/Activity';
import { useAuth } from '../../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

export default function QRScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const { setLoading, setError: setAuthError } = useAuth();

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                Scan QR Code
            </h3>

            <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
                <QrReader
                    onResult={(result) => {
                        if (result) {
                            console.log(result);
                            // setData(result.text);
                            // setIsScanning(false); // หยุดสแกนเมื่อพบ QR Code
                            // console.log('ข้อมูลที่ได้:', result.text);
                        }
                    }}
                    videoStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    constraints={{ facingMode: 'environment' }} // ใช้กล้องหลัง
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

            {/* <div className="flex gap-3">
                {!isScanning ? (
                    <button onClick={startScanner} className="btn flex-1 btn-primary">
                        Start Scanner
                    </button>
                ) : (
                    <button onClick={stopScanner} className="btn flex-1 btn-error">
                        Stop Scanner
                    </button>
                )}
            </div> */}

            <p className="text-sm text-gray-600 mt-3 text-center">
                Point your camera at the QR code to login
            </p>
        </Paper>
    );
}
