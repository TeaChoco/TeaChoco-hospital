//-Path: "TeaChoco-Hospital/client/src/types/signin-qr.ts"
import type { User } from './auth';

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
        this.request = data.request ? new RequestData(data.request) : undefined;
        this.response = data.response ? new ResponseData(data.response) : undefined;
        this.senderSocketId = data.senderSocketId;
    }
    static getData(qr_data: string | object) {
        const result = typeof qr_data === 'string' ? JSON.parse(qr_data) : qr_data;
        try {
            return new SiginQrData({
                request: result.request,
                response: result.response,
                senderSocketId: result.senderSocketId,
            });
        } catch (error) {
            return null;
        }
    }
    request?: RequestData;
    response?: ResponseData;
    senderSocketId?: string;
}
