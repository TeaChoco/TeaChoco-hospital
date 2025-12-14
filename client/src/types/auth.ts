//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
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
