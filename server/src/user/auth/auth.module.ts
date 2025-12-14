//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.module.ts"
import { importJwt } from 'src/hooks/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { imnportCache } from 'src/hooks/cache';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ImportsMongoose } from 'src/hooks/mongodb';
import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategies';
import { GoogleStrategy } from './strategies/google.strategy';
import googleOauthConfig from 'src/config/google-oauth.config';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
    imports: [
        PassportModule,
        importJwt(),
        imnportCache(),
        ConfigModule.forFeature(googleOauthConfig),
        forwardRef(() => UserModule),
        ...new ImportsMongoose({ name: User.name, schema: UserSchema }).imports,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
