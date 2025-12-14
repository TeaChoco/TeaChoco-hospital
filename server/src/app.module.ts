//-Path: "TeaChoco-Hospital/server/src/app.module.ts"
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { SecureModule } from './secure/secure.module';

@Module({
    providers: [AppService],
    controllers: [AppController],
    imports: [SecureModule, UserModule],
})
export class AppModule {}
