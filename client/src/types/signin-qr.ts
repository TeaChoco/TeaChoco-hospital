//-Path: "TeaChoco-Hospital/client/src/types/signin-qr.ts"
import type { User } from './auth';
import type { DateISO } from './types';

export enum SiginQrType {
    None = 'none',
    AuthScanUnauth = 'auth-scan-unauth',
    UnauthScanAuth = 'unauth-scan-auth',
}

export class RequestData {
    constructor(data: RequestData) {
        this.token = data.token;
        this.socketId = data.socketId;
        this.expiresAt = data.expiresAt;
    }
    token: string = '';
    socketId: string = '';
    expiresAt: DateISO = new Date();
}

export class ResponseData {
    constructor(data: ResponseData) {
        this.token = data.token;
        this.socketId = data.socketId;
        this.expiresAt = data.expiresAt;
        this.user = data.user;
    }
    token: string = '';
    socketId: string = '';
    expiresAt: DateISO = new Date();
    user: User = {} as User;
}

export class SiginQrData {
    constructor(data?: SiginQrData) {
        this.type = data?.type || SiginQrType.None;
        this.request = data?.request ? new RequestData(data.request) : undefined;
        this.response = data?.response ? new ResponseData(data.response) : undefined;
        this.senderSocketId = data?.senderSocketId;
    }
    static getData(qr_data: string | SiginQrData): SiginQrData {
        try {
            if (typeof qr_data === 'string' && qr_data.startsWith('http')) {
                const url = new URL(qr_data);
                const token = url.searchParams.get('token');
                if (!token) throw new Error('No token');
                const socketId = url.searchParams.get('socketId');
                if (!socketId) throw new Error('No socketId');
                const expParam = url.searchParams.get('expiresAt');
                if (!expParam) throw new Error('No expiresAt');
                const expiresAt = new Date(expParam);
                return new SiginQrData({
                    type: SiginQrType.UnauthScanAuth,
                    request: { token, socketId, expiresAt },
                });
            }
            const result = typeof qr_data === 'string' ? JSON.parse(qr_data) : qr_data;
            return new SiginQrData({
                type: result.type,
                request: result.request,
                response: result.response,
                senderSocketId: result.senderSocketId,
            });
        } catch (error) {
            console.error(error);
            return new SiginQrData();
        }
    }
    type: SiginQrType = SiginQrType.None;
    request?: RequestData;
    response?: ResponseData;
    senderSocketId?: string;
}
