//-Path: "TeaChoco-Hospital/client/src/services/auth.ts"
import serverRest from './axios';
import type { User } from '../types/auth';

export const authAPI = {
    auth: () => serverRest.get<User | null>('/user/auth'),
    signout: () => serverRest.get('/user/auth/signout'),
};
