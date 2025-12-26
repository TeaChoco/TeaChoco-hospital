//-Path: "motiva/client/src/types/types.ts"
import type { User } from './auth';

export interface SubmitData {
    socketId: string;
    token: string;
    user: User;
}

export interface RequestData {
    socketId: string;
    token: string;
}

export interface ResponseData {
    token: string;
    expiresAt: Date;
    socketId: string;
    user: User;
}

export interface SiginQrData {
    submit?: SubmitData;
    request?: RequestData;
    response?: ResponseData;
}
