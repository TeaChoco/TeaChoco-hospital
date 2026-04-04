//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.module.ts"
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
    exports: [SocketGateway],
    controllers: [SocketController],
    providers: [SocketGateway, SocketService],
})
export class SocketModule {}
