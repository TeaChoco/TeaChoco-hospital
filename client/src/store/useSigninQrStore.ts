//-Path: "TeaChoco-Hospital/client/src/store/useSigninQrStore.ts"
import { create } from 'zustand';
import type { Allows, User } from '../types/auth';
import type { PermissionMatrix } from '../pages/profile/AllowPage';
import { RequestData, ResponseData, SiginQrData, SiginQrType } from '../types/signin-qr';

export const expiresMaxQrCode = 5 * 60 * 1000;

interface SigninQrState {
    token: string;
    expiresAt: Date;
    qrExpiresAt: Date;
    isExpiresAt: boolean;
    requestData?: RequestData;
    responseData?: ResponseData;
    resetToken: () => void;
    setExpiresAt: (expiresAt: Date) => void;
    resetQrExpiresAt: () => void;
    setIsExpiresAt: (isExpiresAt: boolean) => void;
    newRequestData: (props: { id?: string }) => void;
    newResponseData: (props: {
        id?: string;
        user?: User | null;
        permissions: PermissionMatrix;
    }) => void;
    getUserAllows: (user: User, permissions: PermissionMatrix) => User;
    checkData: (incomingData: SiginQrData) => void;
    checkAuthScanUnauth: (incomingData: SiginQrData) => void;
    checkUnauthScanAuth: (incomingData: SiginQrData) => void;
}

export const useSigninQrStore = create<SigninQrState>((set, get) => ({
    token: '',
    isExpiresAt: false,
    expiresAt: new Date(),
    requestData: undefined,
    responseData: undefined,
    qrExpiresAt: new Date(Date.now() + expiresMaxQrCode),
    resetToken: () => set({ token: crypto.randomUUID() }),
    setExpiresAt: (expiresAt) => set((state) => ({ ...state, expiresAt })),
    setIsExpiresAt: (isExpiresAt) => set((state) => ({ ...state, isExpiresAt })),
    resetQrExpiresAt: () =>
        set((state) => ({ ...state, qrExpiresAt: new Date(Date.now() + expiresMaxQrCode) })),
    newRequestData: ({ id }) => {
        if (!id) return;
        const requestData = new RequestData({
            socketId: id,
            token: get().token,
            expiresAt: get().qrExpiresAt,
        });
        // console.log('newRequestData: ', requestData);
        set((state) => ({ ...state, requestData }));
    },
    newResponseData: ({ id, user, permissions }) => {
        if (!id || !user) return;
        get().resetQrExpiresAt();
        const responseData = new ResponseData({
            socketId: id,
            token: get().token,
            expiresAt: get().qrExpiresAt,
            user: get().getUserAllows(user, permissions),
        });
        // console.log('newResponseData: ', responseData);
        set((state) => ({ ...state, responseData }));
    },
    getUserAllows: (user, permissions) => {
        const allowsData: Allows = {
            ...permissions,
            user_id: user.user_id,
            expiresAt: get().isExpiresAt ? get().expiresAt : undefined,
        };
        const userAllows = {
            ...user,
            allows: [allowsData],
        };
        return userAllows;
    },
    checkData: (incomingData) => {
        console.log({
            incomingData,
            requestData: get().requestData,
            responseData: get().responseData,
        });
        if (!incomingData) throw new Error('No incoming data');
        if (!(incomingData instanceof SiginQrData))
            throw new Error(`incomingData is not SiginQrData`);
    },
    checkAuthScanUnauth: (incomingData) => {
        get().checkData(incomingData);
        if (incomingData.type !== SiginQrType.AuthScanUnauth)
            throw new Error('Type mismatch AuthScanUnauth');
        const requestData = get().requestData;
        if (!requestData) throw new Error('No request data');
        if (!requestData.token) throw new Error(`No request token`);
        if (!requestData.socketId) throw new Error(`No request socketId`);
        if (!requestData.expiresAt) throw new Error(`No request expiresAt`);
        const responseData = get().responseData;
        if (!responseData) throw new Error('No response data');
        if (responseData.token !== requestData.token) throw new Error('Token mismatch');
        if (responseData.socketId !== requestData.socketId) throw new Error('SocketId mismatch');
        if (!incomingData.request) throw new Error('No incoming request');
        if (!incomingData.request.token) throw new Error(`No incoming token`);
        if (!incomingData.request.socketId) throw new Error(`No incoming socketId`);
        if (!incomingData.request.expiresAt) throw new Error(`No incoming expiresAt`);
        // if (!incomingData.senderSocketId) throw new Error('No sender socketId');
        // if (incomingData.request.token !== requestData.token) throw new Error('Token mismatch');
        // if (incomingData.request.socketId !== requestData.socketId)
        //     throw new Error('SocketId mismatch');
        // const now = Date.now();
        // const requestExp = new Date(requestData.expiresAt).getTime();
        // const responseExp = new Date(responseData.expiresAt).getTime();
        // const incomingExp = new Date(incomingData.request.expiresAt).getTime();
        // if (now > requestExp) throw new Error('Request expired');
        // if (now > responseExp) throw new Error('Response expired');
        // if (now > incomingExp) throw new Error('Incoming expired');
    },
    checkUnauthScanAuth: (incomingData) => {
        get().checkData(incomingData);
        if (incomingData.type !== SiginQrType.UnauthScanAuth)
            throw new Error('Type mismatch UnauthScanAuth');
    },
}));
