//-Path: "TeaChoco-Hospital/client/src/components/QRScanner.tsx"
import Paper from '../custom/Paper';
import QRScanner from '../code/QRScanner';
import { useSocket } from '../../hooks/useSocket';
import type { ResponseSocketData } from '../../types/types';

export default function QRScannerPage() {
    const { emit } = useSocket();

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <QRScanner
                header="Scan QR Code"
                onScan={(result) => {
                    const data: ResponseSocketData = JSON.parse(result);
                    console.log(data);
                    emit('signin-qr', data);
                }}
                description="Point your camera at the QR code to login"
            />
        </Paper>
    );
}
