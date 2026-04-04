//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.service.ts"
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
        private readonly cacheManager: Cache,
    ) {}

    setServer(server: Server) {
        this.server = server;
    }

    getUser(client: Socket) {
        return client.handshake.auth.user;
    }

    async signinQr(client: Socket, data: SiginQrDto) {
        this.logger.log(`Client ${client.id} sent signin-qr: `, data);

        if (data.response && data.request) {
            // Case 1: Standard Scan - Phone sends credentials to Desktop (Requester)
            this.logger.log('Request & Response Match', data);
            this.logger.log('cache save', `signin-qr_${data.request.socketId}`);
            await this.cacheManager.set(`signin-qr_${data.request.socketId}`, data);

            // Forward to Requester
            this.server.to(data.request.socketId).emit('signin-qr', data);
        } else if (data.response) {
            // Case 2: Response Only (e.g. Granter replying to a Request)
            this.logger.log('Response Only', data);
            this.server.to(data.response.socketId).emit('signin-qr', data);
            this.logger.log('Submit Response', data);
        } else if (data.request) {
            // Case 3: Request Only (e.g. Desktop requesting access from Granter)
            this.logger.log('Request Only', data);
            // Append sender's socket ID so Granter knows where to reply
            const forwardData: SiginQrDto = { ...data, senderSocketId: client.id };
            // Send to Granter (Target)
            this.server.to(data.request.socketId).emit('signin-qr', forwardData);
        }
    }
}
