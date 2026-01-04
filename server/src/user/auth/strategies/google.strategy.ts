//-Path: "TeaChoco-Hospital/server/src/user/auth/strategies/google.strategy.ts"
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserType } from '../../dto/create-user.dto';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SecureService } from '../../../secure/secure.service';
import { Role } from '../../../types/auth';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(readonly secureService: SecureService) {
        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
            secureService.getEnvConfig();

        super({
            clientID: GOOGLE_CLIENT_ID || '',
            clientSecret: GOOGLE_CLIENT_SECRET || '',
            callbackURL: GOOGLE_CALLBACK_URL || '',
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<UserType> {
        const { id, name, displayName, emails, photos, _json } = profile;

        const user: UserType = {
            googleId: id,
            email: emails[0].value,
            name: displayName,
            firstName: name?.givenName ?? _json.given_name ?? '',
            lastName: name?.familyName ?? _json.family_name ?? '',
            picture: photos[0].value ?? _json.picture ?? '',
            allows: [],
            role: Role.USER,
            expiresAt: Date.now() + 3600 * 1000,
            lastLoginAt: Date.now(),
            accessToken,
            refreshToken,
        };

        done(null, user);
        return user;
    }
}
