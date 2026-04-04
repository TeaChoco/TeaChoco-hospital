//-Path: "TeaChoco-Hospital/client/src/components/auth/QRScanner.tsx"
import Paper from '../custom/Paper';
import QRScanner from '../code/QRScanner';
import { useSocket } from '../../hooks/useSocket';
import { SiginQrData } from '../../types/signin-qr';

export default function QRScannerPage() {
    const { emit } = useSocket();

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <QRScanner
                isDev
                header="Scan QR Code"
                onScan={(result) => {
                    try {
                        const data = SiginQrData.getData(result);
                        console.log('Scanned data:', data);
                        if (data && data instanceof SiginQrData) {
                            emit('signin-qr', data);
                        } else {
                            console.log('Invalid QR data format for Signin:', data);
                            // Optional: Show error toast/message to user
                        }
                    } catch (error) {
                        console.error('Error parsing QR code:', error);
                    }
                }}
                description="Point your camera at the QR code to login"
            />
        </Paper>
    );
}
