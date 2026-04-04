//-Path: "TeaChoco-Hospital/client/src/types/signin-qr.ts"
import type { User } from './auth';

export enum SiginQrType {
    None = 'none',
    AuthScanUnauth = 'auth-scan-unauth',
    UnauthScanAuth = 'unauth-scan-auth',
}

export class RequestData {
    constructor(data: any) {
        this.socketId = data.socketId;
        this.token = data.token;
    }
    socketId: string = '';
    token: string = '';
}

export class ResponseData {
    constructor(data: any) {
        this.token = data.token;
        this.expiresAt = data.expiresAt;
        this.socketId = data.socketId;
        this.user = data.user;
    }
    token: string = '';
    expiresAt: Date = new Date();
    socketId: string = '';
    user: User = {} as User;
}

export class SiginQrData {
    constructor(data: any) {
        this.type = data.type || SiginQrType.None;
        this.request = data.request ? new RequestData(data.request) : undefined;
        this.response = data.response ? new ResponseData(data.response) : undefined;
        this.senderSocketId = data.senderSocketId;
    }
    static getData(qr_data: string | object): SiginQrData {
        try {
            if (typeof qr_data === 'string' && qr_data.startsWith('http')) {
                console.log(qr_data);
                const url = new URL(qr_data);
                const socketId = url.searchParams.get('socketId');
                const token = url.searchParams.get('token');
                return new SiginQrData({
                    type: SiginQrType.UnauthScanAuth,
                    request: { socketId, token },
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
            return new SiginQrData({});
        }
    }
    type: SiginQrType = SiginQrType.None;
    request?: RequestData;
    response?: ResponseData;
    senderSocketId?: string;
}
