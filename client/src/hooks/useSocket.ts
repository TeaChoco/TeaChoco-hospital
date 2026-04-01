//-Path: "TeaChoco-Hospital/client/src/hooks/useSocket.ts"
import { socketManager } from '../lib/socket-manager';
import { useEffect, useRef, useState, useCallback } from 'react';

export function useSocket() {
    const socket = socketManager.getSocket();
    const [isConnected, setIsConnected] = useState(socketManager.isConnected());

    // เก็บ mapping จาก callback จริง -> callback ที่ถูก wrap (stableCallback)
    const callbackRegistry = useRef<Map<string, Map<Function, Function>>>(new Map());

    const on = useCallback(<T>(event: string, callback: (data: T) => void) => {
        const stableCallback = (...args: any[]) => callback(args[0] as T);

        if (!callbackRegistry.current.has(event)) callbackRegistry.current.set(event, new Map());

        callbackRegistry.current.get(event)!.set(callback, stableCallback);
        socketManager.addListener(event, stableCallback);
    }, []);

    const off = useCallback((event: string, callback?: Function) => {
        const eventMap = callbackRegistry.current.get(event);
        if (!eventMap) return;

        if (callback) {
            const stableCallback = eventMap.get(callback);
            if (stableCallback) {
                socketManager.removeListener(event, stableCallback);
                eventMap.delete(callback);
            }
        } else {
            eventMap.forEach((stableCallback) => socketManager.removeListener(event, stableCallback));
            callbackRegistry.current.delete(event);
        }
    }, []);

    const useEvent = useCallback(
        (event: string, callback: (...args: any[]) => void, deps: React.DependencyList = []) => {
            useEffect(() => {
                on(event, callback);
                return () => off(event, callback);
            }, [event, ...deps]);
        },
        [on, off],
    );

    const emit = useCallback(<T>(event: string, data?: T) => socketManager.emit(event, data), []);

    useEffect(() => {
        socketManager.connect();

        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);
        const handleConnectError = (error: Error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        };

        socketManager.addListener('connect', handleConnect);
        socketManager.addListener('disconnect', handleDisconnect);
        socketManager.addListener('connect_error', handleConnectError);

        setIsConnected(socketManager.isConnected());

        return () => {
            socketManager.removeListener('connect', handleConnect);
            socketManager.removeListener('disconnect', handleDisconnect);
            socketManager.removeListener('connect_error', handleConnectError);

            callbackRegistry.current.forEach((eventMap, event) => {
                eventMap.forEach((stableCallback) => socketManager.removeListener(event, stableCallback));
            });
            callbackRegistry.current.clear();
        };
    }, []);

    return {
        on,
        off,
        emit,
        socket,
        useEvent,
        isConnected,
        id: socket?.id,
    };
}

