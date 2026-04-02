//-Path: "TeaChoco-Hospital/client/src/hooks/useSocket.ts"
import { useCallback, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useSocketStore } from '../store/useSocketStore';

export const useSocket = (autoConnect = true) => {
    const { user } = useUserStore();
    const { socket, connectSocket, disconnectSocket, onEvent, emitEvent, isConnected } =
        useSocketStore();

    // Handle connection lifecycle based on user changes
    useEffect(() => {
        if (!autoConnect) return;

        // ถ้า login แล้ว ให้ connect
        if (user || user === null) connectSocket(user);
        // ถ้า logout (user === null) ดึง disconnect
        else if (user === undefined) disconnectSocket();

        // อย่าใช้ disconnectSocket ใน cleanup ของ useEffect นี้
        // เพราะเวลา component ที่ใช้ hook นี้ unmount (เช่น เปลี่ยนหน้า)
        // จะทำให้ socket หลุดและต่อใหม่ทันทีที่หน้าใหม่ render เกิดเป็นลูป
    }, [autoConnect, user, connectSocket, disconnectSocket]);

    const useEvent = useCallback(
        (event: string, callback: (...args: any[]) => void, deps: React.DependencyList = []) => {
            useEffect(() => {
                if (!isConnected) return;
                const unsubscribe = onEvent(event, callback);
                return () => unsubscribe();
            }, [event, isConnected, onEvent, ...deps]);
        },
        [onEvent, isConnected],
    );

    return {
        socket,
        useEvent,
        on: onEvent,
        id: socket?.id,
        emit: emitEvent,
        isConnected,
    };
};
