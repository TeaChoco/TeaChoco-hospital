//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.module.ts"
import { importJwt } from '../../hooks/jwt';
import { UserModule } from '../user.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { imnportCache } from '../../hooks/cache';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ImportsMongoose } from '../../hooks/mongodb';
import { JwtStrategy } from './strategies/jwt.strategies';
import { User, UserSchema } from '../schemas/user.schema';
import { GoogleStrategy } from './strategies/google.strategy';
import googleOauthConfig from '../../config/google-oauth.config';
import { LocalStrategy } from './strategies/local.strategies';

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
