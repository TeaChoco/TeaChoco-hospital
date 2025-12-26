//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"
import type { QueryOptions } from './types';

export enum Allow {
    AUTH = 'auth',
    HOSPITALS = 'hospitals',
    APPOINTMENTS = 'appointments',
    DOCTORS = 'doctors',
    MEDICINES = 'medicines',
    CALENDARS = 'calendars',
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    VISITOR = 'visitor',
}

export interface Allows {
    user_id: string;
    read: Allow[];
    edit: Allow[];
    expiresAt?: Date;
}

export interface User {
    user_id: string;
    googleId?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    allows?: Allows[];
    role?: Role;
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
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lastLoginAt?: boolean;
}
