//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import { useCallback } from 'react';
import Paper from '../../custom/Paper';
import { useEffect, useMemo } from 'react';
import QRGenerator from '../code/QRGenerator';
import { useSocket } from '../../../hooks/useSocket';
import { useSigninQrStore } from '../../../store/useSigninQrStore';
import { SiginQrData, SiginQrType } from '../../../types/signin-qr';

export default function QRGeneratorPage() {
    const { id } = useSocket();
    const { requestData, resetToken, newRequestData } = useSigninQrStore();

    const newValue = useCallback(() => {
        resetToken();
        newRequestData({ id });
    }, [id, resetToken, newRequestData]);

    useEffect(() => {
        newValue();
    }, [newValue]);

    const value: string | undefined = useMemo(() => {
        if (!requestData) return;
        const data = new SiginQrData({
            type: SiginQrType.AuthScanUnauth,
            request: requestData,
        });
        return JSON.stringify(data);
    }, [requestData]);

    return (
        <Paper variant="200" className="w-full max-w-sm mx-auto">
            <QRGenerator
                value={value}
                newValue={newValue}
                header="Scan to Login"
                description="Use your mobile app to scan this QR code for quick login"
            />
        </Paper>
    );
}
