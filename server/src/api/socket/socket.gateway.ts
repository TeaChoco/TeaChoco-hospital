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
import { SocketService } from './socket.service';
import { SiginQrDto } from '../../user/auth/dto/signin-qr.dto';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    logger = new Logger(SocketGateway.name);

    constructor(private socketService: SocketService) {}

    afterInit(server: Server) {
        this.socketService.setServer(server);
        this.logger.log('Socket.io server initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('signin-qr')
    async handleSigninQr(
        @MessageBody() data: SiginQrDto,
        @ConnectedSocket() client: Socket,
    ): Promise<string> {
        await this.socketService.signinQr(client, data);
        return 'ok';
    }
}
