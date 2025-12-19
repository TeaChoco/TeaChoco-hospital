//-Path: "TeaChoco-Hospital/client/src/hooks/useSocket.ts"
import { useEffect } from 'react';
import { socketAtom } from '../context/socketAtom';
import { useAtom } from 'jotai';

export type UseSocket = ReturnType<typeof useSocket>;

export function useSocket() {
    const [socket, setSocket] = useAtom(socketAtom);

    useEffect(() => {
        connectSocket();

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        return () => {
            disconnectSocket();
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    const emit = (event: string, data: any) => {
        socket.emit(event, data);
    };

    const on = (event: string, callback: (data: any) => void) => {
        socket.on(event, callback);
        return () => socket.off(event, callback);
    };

    return {
        on,
        emit,
        socket,
        isConnected: socket.connected,
    };
}
