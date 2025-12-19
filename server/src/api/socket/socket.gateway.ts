//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.gateway.ts"
import {
    OnGatewayInit,
    WebSocketServer,
    SubscribeMessage,
    WebSocketGateway,
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

    /**
     * @description ทำงานหลังจาก gateway ถูกสร้าง
     */
    afterInit(server: Server) {
        this.logger.log('Socket.io server initialized');
    }

    /**
     * @description ทำงานเมื่อมี client เชื่อมต่อเข้ามา
     */
    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    /**
     * @description ทำงานเมื่อ client ตัดการเชื่อมต่อ
     */
    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    /**
     * @description รับข้อความ event 'events' จาก client
     */
    @SubscribeMessage('events')
    handleEvent(client: Socket, data: string): string {
        this.logger.log(`Client ${client.id} sent event: ${data}`);
        return data;
    }

    /**
     * @description รับข้อความ event 'identity' และส่งกลับ
     */
    @SubscribeMessage('identity')
    async identity(client: Socket, data: number): Promise<number> {
        this.logger.log(`Client ${client.id} sent identity: ${data}`);
        return data;
    }
}
