//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import Paper from '../custom/Paper';
import QRScanner from '../code/QRScanner';
import { useSocket } from '../../hooks/useSocket';
import type { SiginQrData } from '../../types/signin-qr.dto';

export default function QRScannerPage() {
    const { emit } = useSocket();

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <QRScanner
                header="Scan QR Code"
                onScan={(result) => {
                    const data: SiginQrData = JSON.parse(result);
                    console.log(data);
                    if (typeof data === 'object' && data.response) emit('signin-qr', data);
                    else console.log(data, 'is not SiginQrData');
                }}
                description="Point your camera at the QR code to login"
            />
        </Paper>
    );
}
