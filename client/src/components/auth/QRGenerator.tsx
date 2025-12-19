//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import { useMemo } from 'react';
import Paper from '../custom/Paper';
import QRGenerator from '../code/QRGenerator';
import { useSocket } from '../../hooks/useSocket';
import type { RequestSocketData } from '../../types/types';

export default function QRGeneratorPage() {
    const { id } = useSocket();

    const value: string | undefined = useMemo(() => {
        if (!id) return undefined;
        const data: RequestSocketData = { request: { socketId: id } };
        return JSON.stringify(data);
    }, [id]);

    return (
        <Paper variant="200" className="w-full max-w-sm mx-auto">
            <QRGenerator
                value={value}
                header="Scan to Login"
                description="Use your mobile app to scan this QR code for quick login"
            />
        </Paper>
    );
}
