//-Path: "TeaChoco-Hospital/server/src/user/auth/strategies/jwt.strategies.ts"
import { Auth } from '../../../types/auth';
import { UserService } from '../../user.service';
import { UserJWTPayload } from '../../dto/user.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecureService } from '../../../secure/secure.service';

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
