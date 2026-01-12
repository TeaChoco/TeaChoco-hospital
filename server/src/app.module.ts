//-Path: "TeaChoco-Hospital/server/src/app.module.ts"
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { importCache } from './hooks/cache';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { SecureModule } from './secure/secure.module';
import { SocketModule } from './api/socket/socket.module';

@Module({
    providers: [AppService],
    controllers: [AppController],
    imports: [ApiModule, UserModule, AuthModule, SocketModule, SecureModule, importCache()],
})
export class AppModule {}
