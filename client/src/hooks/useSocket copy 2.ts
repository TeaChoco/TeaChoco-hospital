//-Path: "TeaChoco-Hospital/client/src/hooks/useSocket.ts"
import { useAuth } from './useAuth';
import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef } from 'react';

const URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export type UseSocket = ReturnType<typeof useSocket>;

interface SocketOptions {
    namespace?: string;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
}

export function useSocket(options?: SocketOptions) {
    const { user, isAuthenticated } = useAuth();
    const isConnectingRef = useRef(false);
    const socketRef = useRef<Socket>(null);

    const connect = useCallback(() => {
        if (socketRef.current?.connected || isConnectingRef.current) {
            return;
        }

        isConnectingRef.current = true;

        // สร้าง socket instance พร้อม auth
        const socket = io(`${URL}${options?.namespace || ''}`, {
            autoConnect: false, // ควบคุมการเชื่อมต่อเอง
            auth: { user },
            transports: ['websocket', 'polling'],
            reconnection: options?.reconnection ?? true,
            reconnectionAttempts: options?.reconnectionAttempts ?? 5,
            reconnectionDelay: options?.reconnectionDelay ?? 1000,
        });

        socketRef.current = socket;

        // เชื่อมต่อ socket
        socket.connect();

        // Event listeners
        socket.on('connect', () => {
            console.log('Socket connected');
            isConnectingRef.current = false;
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            isConnectingRef.current = false;
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }, [user, isAuthenticated, options]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            isConnectingRef.current = false;
        }
    }, []);

    const emit = useCallback(<T>(event: string, data?: T) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(event, data);
            return true;
        }
        console.warn('Socket not connected');
        return false;
    }, []);

    const on = useCallback(<T>(event: string, callback: (data: T) => void) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    }, []);

    const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
        if (socketRef.current) {
            socketRef.current.off(event, callback);
        }
    }, []);

    // Auto reconnect เมื่อ token เปลี่ยน
    useEffect(() => {
        if (user && isAuthenticated) {
            connect();
        } else {
            disconnect();
        }

        return () => {
            // Cleanup เฉพาะ listeners แต่ไม่ disconnect
            // (ให้จัดการ disconnect ใน component ที่ใช้)
        };
    }, [user, isAuthenticated, connect, disconnect]);

    return {
        socket: socketRef.current,
        connected: socketRef.current?.connected || false,
        connect,
        disconnect,
        emit,
        on,
        off,
    };
}
