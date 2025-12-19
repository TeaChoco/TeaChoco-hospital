//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.module.ts"
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
    exports: [SocketGateway],
    providers: [SocketGateway],
})
export class SocketModule {}
