//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import { useState } from 'react';
import Paper from '../custom/Paper';
import { useEffect, useMemo } from 'react';
import QRGenerator from '../code/QRGenerator';
import { useSocket } from '../../hooks/useSocket';
import type { RequestSocketData } from '../../types/types';

export default function QRGeneratorPage() {
    const { id } = useSocket();
    const [requestData, setRequestData] = useState<RequestSocketData | undefined>(undefined);

    const getValue = () => {
        if (!id) return;
        const token = crypto.randomUUID();
        const data: RequestSocketData = { request: { socketId: id, token } };
        setRequestData(data);
    };

    useEffect(() => {
        getValue();
    }, [id]);

    const value: string | undefined = useMemo(() => {
        if (requestData) return JSON.stringify(requestData);
    }, [requestData]);

    return (
        <Paper variant="200" className="w-full max-w-sm mx-auto">
            <QRGenerator
                value={value}
                refresh={getValue}
                header="Scan to Login"
                description="Use your mobile app to scan this QR code for quick login"
            />
        </Paper>
    );
}
