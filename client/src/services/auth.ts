//-Path: "TeaChoco-Hospital/client/src/services/auth.ts"
import serverRest from './axios';
import type { User } from '../types/auth';
import type { SiginQrData } from '../types/signin-qr.dto';

export const authAPI = {
    auth: () => serverRest.get<User | null>('/user/auth'),
    signout: () => serverRest.get('/user/auth/signout'),
    signinQr: (data: SiginQrData) => serverRest.post('/user/auth/signin-qr', data),
};
