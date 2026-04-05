// -Path: "TeaChoco-Hospital/client/src/hooks/useCheckSigninQr.ts"
import { useCallback } from 'react';
import { useSocket } from './useSocket';
import { SiginQrData } from '../types/signin-qr';
import { useSigninQrStore } from '../store/useSigninQrStore';

export function useUrlSigninQr() {
    const { emit } = useSocket();
    const { checkUnauthScanAuth } = useSigninQrStore();

    return useCallback((url: string) => {
        try {
            const data = SiginQrData.getData(url);
            checkUnauthScanAuth(data);
            console.log('Scanned data:', data);
            if (data instanceof SiginQrData) emit('signin-qr', data);
            else console.error('Invalid QR data format for Signin:', data);
        } catch (error) {
            console.error('Error parsing QR code:', error);
        }
    }, []);
}
