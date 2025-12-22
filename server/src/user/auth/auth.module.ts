//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.module.ts"
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user.module';
import { importJwt } from '../../hooks/jwt';
import { PassportModule } from '@nestjs/passport';
import { imnportCache } from '../../hooks/cache';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ImportsMongoose } from '../../hooks/mongodb';
import { JwtStrategy } from './strategies/jwt.strategies';
import { User, UserSchema } from '../schemas/user.schema';
import { LocalStrategy } from './strategies/local.strategies';
import { GoogleStrategy } from './strategies/google.strategy';
import googleOauthConfig from '../../config/google-oauth.config';

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
    providers: [AuthService, JwtStrategy, GoogleStrategy, LocalStrategy],
})
export class AuthModule {}
