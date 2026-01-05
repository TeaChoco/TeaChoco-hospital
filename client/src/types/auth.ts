//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"
import type { QueryOptions } from './types';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    VISITOR = 'visitor',
}

export enum Resource {
    AUTH = 'auth',
    DOCTORS = 'doctors',
    HOSPITALS = 'hospitals',
    MEDICINES = 'medicines',
    CALENDARS = 'calendars',
    APPOINTMENTS = 'appointments',
}

export interface Allow {
    edit: boolean;
    read: boolean;
}

export interface Allows extends Record<Resource, Allow> {
    user_id: string;
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
