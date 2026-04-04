//-Path: "TeaChoco-Hospital/client/src/store/useSocketStore.ts"
import { create } from 'zustand';
import type { Socket } from 'socket.io-client';
import { socketService } from '../services/socket';

interface SocketState {
    socket: Socket | null;
    isConnected: boolean;
    error: string | null;
    connectSocket: (user: any) => void;
    disconnectSocket: () => void;
    emitEvent: (event: string, data?: any) => void;
    onEvent: <T = any>(event: string, callback: (data: T) => void) => () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    isConnected: false,
    error: null,

    connectSocket: (user) => {
        try {
            // Check if already connected with the same socket
            if (get().socket?.connected) return;

            const socket = socketService.connect(user);

            // Remove all previous listeners to prevent duplicates
            socket.removeAllListeners('connect');
            socket.removeAllListeners('disconnect');
            socket.removeAllListeners('connect_error');

            // Setup connection listeners
            socket.on('connect', () => {
                set({ isConnected: true, error: null, socket });
            });

            socket.on('disconnect', () => {
                set({ isConnected: false });
            });

            socket.on('connect_error', (error) => {
                set({ error: error.message, isConnected: false });
            });

            // Set socket immediately as it might be connecting
            set({ socket });
        } catch (error: any) {
            set({ error: error.message });
        }
    },

    disconnectSocket: () => {
        socketService.disconnect();
        set({ socket: null, isConnected: false, error: null });
    },

    emitEvent: (event, data) => {
        socketService.emit(event, data);
    },

    onEvent: (event, callback) => {
        socketService.on(event, callback);

        // Return cleanup function
        return () => {
            socketService.off(event, callback);
        };
    },
}));
