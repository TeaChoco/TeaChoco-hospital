//-Path: "TeaChoco-Hospital/client/src/components/auth/QRScanner.tsx"
import Paper from '../../custom/Paper';
import QRScanner from '../code/QRScanner';
import { useUrlSigninQr } from '../../../hooks/useUrlSigninQr';

export default function QRScannerPage() {
    const urlSigninQr = useUrlSigninQr();

    return (
        <Paper variant="200" className="w-full max-w-md mx-auto">
            <QRScanner
                header="Scan QR Code"
                onScan={(result) => urlSigninQr(result)}
                description="Point your camera at the QR code to login"
            />
        </Paper>
    );
}
