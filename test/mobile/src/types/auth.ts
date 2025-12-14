//-Path: "TeaChoco-Hospital/client/src/types/auth.ts"
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    error: string | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface LoginResponse {
    user?: User;
    token?: string;
    error?: string;
    success: boolean;
}

export interface QRLoginData {
    type: 'login';
    sessionId: string;
    timestamp: number;
}
