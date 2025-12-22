//-Path: "TeaChoco-Hospital/client/src/hooks/useSocket.ts"
import { socketManager } from '../lib/socket-manager';
import { useEffect, useRef, useState, useCallback } from 'react';

export function useSocket() {
    const [isConnected, setIsConnected] = useState(socketManager.isConnected());

    const stableCallbacks = useRef<{
        [event: string]: Set<(...args: any[]) => void>;
    }>({});

    const id = socketManager.getSocket()?.id;

    const on = useCallback(<T>(event: string, callback: (data: T) => void) => {
        const stableCallback = (...args: any[]) => callback(args[0] as T);

        if (!stableCallbacks.current[event]) stableCallbacks.current[event] = new Set();

        stableCallbacks.current[event].add(stableCallback);

        socketManager.addListener(event, stableCallback);
    }, []);

    const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
        if (callback) {
            socketManager.removeListener(event, callback);

            // ลบออกจาก ref ด้วย
            if (stableCallbacks.current[event]) stableCallbacks.current[event].delete(callback);
        } else {
            // ลบทั้งหมดของ event นี้
            const callbacks = stableCallbacks.current[event];
            if (callbacks) {
                callbacks.forEach((cb) => socketManager.removeListener(event, cb));
                delete stableCallbacks.current[event];
            }
        }
    }, []);

    const emit = useCallback(<T>(event: string, data?: T) => socketManager.emit(event, data), []);

    // Connect socket เมื่อ hook mount
    useEffect(() => {
        socketManager.connect();

        // Subscribe to connection status changes
        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);
        const handleConnectError = (error: Error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        };

        socketManager.addListener('connect', handleConnect);
        socketManager.addListener('disconnect', handleDisconnect);
        socketManager.addListener('connect_error', handleConnectError);

        // Initial connection status
        setIsConnected(socketManager.isConnected());

        return () => {
            // Cleanup only our listeners, not the socket connection
            socketManager.removeListener('connect', handleConnect);
            socketManager.removeListener('disconnect', handleDisconnect);
            socketManager.removeListener('connect_error', handleConnectError);

            // Cleanup all event listeners ที่ hook นี้เพิ่ม
            Object.entries(stableCallbacks.current).forEach(([event, callbacks]) =>
                callbacks.forEach((callback) => socketManager.removeListener(event, callback)),
            );
            stableCallbacks.current = {};
        };
    }, []);

    return {
        on,
        off,
        emit,
        id,
        isConnected,
        socket: socketManager.getSocket(),
    };
}
