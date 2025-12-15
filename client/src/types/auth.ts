//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"

import type { QueryOptions } from './types';

export interface Allow {
    read: string[];
    edit: string[];
}

export interface User {
    user_id: string;
    googleId?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    allows?: Allow[];
    createdAt?: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
}

export interface QRLoginData {
    sessionId: string;
    timestamp: number;
    type: 'login';
}

export interface UserQuery extends QueryOptions {
    auth?: boolean;
    googleId?: boolean;
    email?: boolean;
    name?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    picture?: boolean;
    allows?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lastLoginAt?: boolean;
}
