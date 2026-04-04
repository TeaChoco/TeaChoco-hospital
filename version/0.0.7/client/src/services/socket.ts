//-Path: "TeaChoco-Hospital/client/src/services/socket.ts"
import env from '../configs/env';
import { io, type Socket } from 'socket.io-client';

type SocketCallback = (...args: any[]) => void;

class SocketService {
    private socket: Socket | null = null;
    private listeners: Map<string, Set<SocketCallback>> = new Map();
    private url: string = env.apiUrl || 'http://127.0.0.1:3000';

    connect(user: any): Socket {
        // ถ้า socket มีอยู่แล้วและ connected อยู่ ไม่ต้องสร้างใหม่
        if (this.socket?.connected) return this.socket;

        // ปิด socket เก่าถ้ามี (กรณี disconnected แต่ยังมี instance)
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.disconnect();
        }

        this.socket = io(this.url, {
            auth: {
                user,
                tokenKey: `Bearer ${env.apiTokenKey}`,
            },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.disconnect();
            this.socket = null;
        }
        this.listeners.clear();
    }

    getSocket() {
        return this.socket;
    }

    isConnected() {
        return this.socket?.connected ?? false;
    }

    emit(event: string, data?: any) {
        if (this.socket?.connected) this.socket.emit(event, data);
    }

    on(event: string, callback: SocketCallback) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event)!.add(callback);
        this.socket?.on(event, callback);
    }

    off(event: string, callback?: SocketCallback) {
        if (callback) {
            this.listeners.get(event)?.delete(callback);
            this.socket?.off(event, callback);
        } else {
            this.listeners.delete(event);
            this.socket?.off(event);
        }
    }
}

export const socketService = new SocketService();
