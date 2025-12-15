//-Path: "TeaChoco-Hospital/server/src/user/auth/strategies/jwt.strategies.ts"
import { UserService } from 'src/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecureService } from 'src/secure/secure.service';
import { Auth, UserJWTPayload } from 'src/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        readonly secureService: SecureService,
        private readonly userService: UserService,
    ) {
        const { JWT_SECRET } = secureService.getEnvConfig();
        if (!JWT_SECRET) throw new Error('JWT secret is not defined');
        super({
            secretOrKey: JWT_SECRET,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => request?.cookies?.access_token,
            ]),
        });
    }

    async validate(payload: UserJWTPayload): Promise<Auth> {
        return (await this.userService.responseUser({ auth: true }, payload)) as Auth;
    }
}
