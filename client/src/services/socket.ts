//-Path: "TeaChoco-Hospital/client/src/services/socket.ts"
import { io, Socket } from 'socket.io-client';

const URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const socket: Socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

/**
 * @description เชื่อมต่อ socket
 */
export const connectSocket = () => {
    if (!socket.connected) socket.connect();
};

/**
 * @description ตัดการเชื่อมต่อ socket
 */
export const disconnectSocket = () => {
    if (socket.connected) socket.disconnect();
};
