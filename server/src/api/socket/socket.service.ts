//-Path: "TeaChoco-Hospital/server/src/api/medicines/medicines.service.ts"
import { Socket, Server } from 'socket.io';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { SiginQrDto } from '../../user/auth/dto/signin-qr.dto';

@Injectable()
export class SocketService {
    server: Server;
    logger = new Logger(SocketService.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}

    setServer(server: Server) {
        this.server = server;
    }

    getUser(client: Socket) {
        return client.handshake.auth.user;
    }

    async signinQr(client: Socket, data: SiginQrDto) {
        this.logger.log(`Client ${client.id} sent signin-qr: ${data}`);
        const token = crypto.randomUUID();
        if (data.response && data.request) {
            this.logger.log('Request', data);
            const submit: SiginQrDto = { ...data };
            submit.submit = {
                token,
                user: data.response.user,
                socketId: client.id,
            };
            this.logger.log('cach save', `signin-qr_${data.request.socketId}`);
            await this.cacheManager.set(`signin-qr_${data.request.socketId}`, submit);
            this.server.to(data.request.socketId).emit('signin-qr', submit);
            this.logger.log('Submit Request', submit);
        } else if (data.response) {
            this.logger.log('Response', data);
            const submit: SiginQrDto = { ...data };
            this.server.to(data.response.socketId).emit('signin-qr', submit);
            this.logger.log('Submit Response', submit);
        }
    }
}
