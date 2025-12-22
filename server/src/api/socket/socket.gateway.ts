//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.gateway.ts"
import {
    MessageBody,
    OnGatewayInit,
    ConnectedSocket,
    WebSocketServer,
    WebSocketGateway,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
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

    @SubscribeMessage('signin-qr')
    handleSigninQr(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        this.logger.debug(client.handshake.auth);
        this.logger.log(`Client ${client.id} sent signin-qr: ${data}`);
        return data;
    }
}
