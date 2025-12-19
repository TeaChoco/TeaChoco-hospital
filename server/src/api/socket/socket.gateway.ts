//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.gateway.ts"
import {
    OnGatewayInit,
    WebSocketServer,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    logger = new Logger(SocketGateway.name);

    afterInit(server: Server) {
        this.logger.log('Socket.io server initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // รับข้อความจาก client
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        console.log(`Message from ${client.id}: ${data}`);

        // ส่งข้อความกลับไปยัง client ที่ส่งมา
        client.emit('message', `Server received: ${data}`);

        // ส่งข้อความไปยังทุก client
        this.server.emit('broadcast', `${client.id} said: ${data}`);

        return 'Message received';
    }

    @SubscribeMessage('signin-qr')
    handleSigninQr(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        this.logger.debug(client.handshake.auth);
        this.logger.log(`Client ${client.id} sent signin-qr: ${data}`);
        return data;
    }
}
