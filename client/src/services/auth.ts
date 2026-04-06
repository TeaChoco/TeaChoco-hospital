//-Path: "TeaChoco-Hospital/client/src/services/auth.ts"
import serverRest from './axios';
import type { SiginQrData } from '../types/signin-qr';
import type { SigninQrResult, User } from '../types/auth';

export const authAPI = {
    auth: () => serverRest.get<User | null>('/user/auth'),
    signout: () => serverRest.get('/user/auth/signout'),
    signinQr: (data: SiginQrData) => serverRest.post<SigninQrResult>('/user/auth/signin-qr', data),
};
