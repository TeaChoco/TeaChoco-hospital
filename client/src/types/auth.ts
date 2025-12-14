//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"

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
    locale?: string;
    gender?: string;
    birthday?: string;
    allows?: Allow[];
    createdAt?: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface LoginResponse {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

export interface QRLoginData {
    sessionId: string;
    timestamp: number;
    type: 'login';
}
