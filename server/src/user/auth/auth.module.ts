//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.module.ts"
import { importJwt } from '$/hooks/jwt';
import { AuthService } from './auth.service';
import { imnportCache } from '$/hooks/cache';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '$/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ImportsMongoose } from '$/hooks/mongodb';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategies';
import googleOauthConfig from '$/config/google-oauth.config';
import { LocalStrategy } from './strategies/local.strategies';
import { GoogleStrategy } from './strategies/google.strategy';
import { User, UserSchema } from '$/user/schemas/user.schema';

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
