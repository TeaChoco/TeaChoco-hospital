//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.service.ts"
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { nameDB } from 'src/hooks/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SecureService } from 'src/secure/secure.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly secureService: SecureService,
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.email,
            name: `${user.firstName} ${user.lastName}`,
            picture: user.picture,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                picture: user.picture,
            },
        };
    }

    createHash(): (password: string) => string {
        const { PASSWORD_HASH_SALT } = this.secureService.getEnvConfig();
        if (PASSWORD_HASH_SALT) {
            return (password: string) => {
                try {
                    return crypto.createHash('sha256').update(password).digest('hex');
                } catch (error) {
                    throw new Error(error);
                }
            };
        }
        throw new Error('PASSWORD_HASH_SALT is not defined');
    }
}
