//-Path: "TeaChoco-Hospital/client/src/lib/socket-manager.ts"
import { getDefaultStore } from 'jotai';
import { userAtom } from '../context/userAtom';
import { io, type Socket } from 'socket.io-client';

class SocketManager {
    private URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    private store = getDefaultStore();
    private socket: Socket | null = null;
    private listeners: Map<string, Set<Function>> = new Map();
    private static instance: SocketManager;

    private constructor() {
        this.subscribeToUserChanges();
    }

    static getInstance(): SocketManager {
        if (!SocketManager.instance) SocketManager.instance = new SocketManager();
        return SocketManager.instance;
    }

    private getUserState() {
        return this.store.get(userAtom);
    }

    connect() {
        const user = this.getUserState();

        // รอจนกว่า userAtom จะไม่ใช่ undefined (เพราะ undefined คือช่วงกำลังโหลด)
        if (user === undefined) return;

        // ถ้ายังไม่มี socket หรือ socket disconnected
        if (!this.socket || this.socket.disconnected) {
            // ปิด socket เก่าถ้ามี
            if (this.socket) this.socket.disconnect();

            this.socket = io(this.URL, {
                auth: {
                    user,
                    tokenKey: `Bearer ${import.meta.env.VITE_API_TOKEN_KEY}`,
                },
                autoConnect: true,
                reconnection: true,
                transports: ['websocket'],
            });

            this.setupEventForwarding();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.listeners.clear();
        }
    }

    private setupEventForwarding() {
        if (!this.socket) return;

        // Forward events ไปยัง listeners ทั้งหมด
        this.socket.onAny((eventName, ...args) => {
            const eventListeners = this.listeners.get(eventName);
            if (eventListeners)
                eventListeners.forEach((callback) => {
                    try {
                        callback(...args);
                    } catch (error) {
                        console.error(`Error in socket listener for ${eventName}:`, error);
                    }
                });
        });

        this.socket.on('connect', () => {
            const connectListeners = this.listeners.get('connect');
            if (connectListeners) connectListeners.forEach((callback) => callback());
        });

        this.socket.on('disconnect', (reason) => {
            const disconnectListeners = this.listeners.get('disconnect');
            if (disconnectListeners) disconnectListeners.forEach((callback) => callback(reason));
        });

        this.socket.on('connect_error', (error) => {
            const errorListeners = this.listeners.get('connect_error');
            if (errorListeners) errorListeners.forEach((callback) => callback(error));
        });
    }

    addListener(event: string, callback: Function) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event)!.add(callback);
    }

    removeListener(event: string, callback: Function) {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.delete(callback);
            if (eventListeners.size === 0) this.listeners.delete(event);
        }
    }

    emit(event: string, data?: any) {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
            return true;
        }
        return false;
    }

    getSocket() {
        return this.socket;
    }

    isConnected() {
        return this.socket?.connected || false;
    }

    // Reconnect เมื่อ user เปลี่ยน
    subscribeToUserChanges() {
        return this.store.sub(userAtom, () => {
            const user = this.getUserState();
            if (user !== undefined) {
                // ถ้ามี socket อยู่แล้วแต่ user เปลี่ยน (เช่น Login/Logout) ให้เลิกเชื่อมต่อแล้วเริ่มใหม่
                if (this.socket) this.disconnect();
                this.connect();
            }
        });
    }
}

export const socketManager = SocketManager.getInstance();
