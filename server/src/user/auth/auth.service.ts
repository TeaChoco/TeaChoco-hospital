//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.service.ts"
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { nameDB } from 'src/hooks/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SecureService } from 'src/secure/secure.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Auth, ReqUserDto } from '../dto/user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly secureService: SecureService,
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async signin(
        user: ReqUserDto,
    ): Promise<{ access_token: string; user: ResponseUserDto | null }> {
        const userDB = await this.userModel.findOne({ email: user.email }).exec();
        if (!userDB) return this.signup(user);
        const responseUser = await this.userService.responseUser({ auth: true }, userDB);

        const payload: ReqUserDto = {
            user_id: userDB._id.toString(),
            googleId: userDB.googleId,
            email: userDB.email,
            name: userDB.name,
            firstName: userDB.firstName,
            lastName: userDB.lastName,
            picture: userDB.picture,
            allows: userDB.allows,
            createdAt: userDB.createdAt,
            updatedAt: userDB.updatedAt,
            lastLoginAt: userDB.lastLoginAt,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: responseUser,
        };
    }

    async signup(user: ReqUserDto) {
        const newUser = new this.userModel({
            ...user,
            lastLoginAt: Date.now(),
        });
        await newUser.save();
        return this.signin(user);
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
