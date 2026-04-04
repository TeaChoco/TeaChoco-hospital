//-Path: "TeaChoco-Hospital/client/src/store/useSigninQrStore.ts"
import { create } from 'zustand';
import type { Allows, User } from '../types/auth';
import type { PermissionMatrix } from '../pages/profile/AllowPage';
import { ResponseData, SiginQrData, SiginQrType } from '../types/signin-qr';

interface SigninQrState {
    token: string;
    qrExpiresAt: Date;
    responseData: SiginQrData;
    resetToken: () => void;
    newResponseData: (props: {
        id?: string;
        expiresAt: Date;
        expiresMax: number;
        user?: User | null;
        isExpiresAt: boolean;
        permissions: PermissionMatrix;
    }) => void;
}

export const useSigninQrStore = create<SigninQrState>((set, get) => ({
    qrExpiresAt: new Date(),
    token: crypto.randomUUID(),
    responseData: SiginQrData.getData({ type: SiginQrType.UnauthScanAuth }),
    resetToken: () => set({ token: crypto.randomUUID() }),
    newResponseData: ({ id, user, expiresAt, expiresMax, isExpiresAt, permissions }) => {
        if (!id || !user) return;
        get().resetToken();
        const allowsData: Allows = {
            ...permissions,
            user_id: user.user_id,
            expiresAt: isExpiresAt ? expiresAt : undefined,
        };
        set((state) => ({ ...state, qrExpiresAt: new Date(Date.now() + expiresMax) }));
        const data = SiginQrData.getData({
            type: SiginQrType.UnauthScanAuth,
            response: {
                socketId: id,
                token: get().token,
                expiresAt: get().qrExpiresAt,
                user: { ...user, allows: [allowsData] },
            } as ResponseData,
        });
        set((state) => ({ ...state, responseData: data }));
    },
}));
