//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.service.ts"
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { nameDB } from '$/hooks/mongodb';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '$/user/user.service';
import { SecureService } from '$/secure/secure.service';
import { Allow, Auth, ReqUserDto } from '$/user/dto/user.dto';
import { ResponseUserDto } from '$/user/dto/response-user.dto';
import { User, UserDocument } from '$/user/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly secureService: SecureService,
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    // async login(password: string): Promise<string> {
    //     const createHash = this.createHash();
    //     return createHash(password);
    // }

    async login(user: ReqUserDto) {
        if (user.email) return { accessToken: this.jwtService.sign(user) };
        throw new BadRequestException({ user });
    }

    async validateUser(email: string, password: string) {
        const createHash = this.createHash();
        const user = await this.userModel.findOne({ email }).exec();

        if (email === '') throw new BadRequestException("Username can't be empty");
        else if (password === '') throw new BadRequestException("Password can't be empty");
        else {
            if (user && createHash(password) === user.password) {
                const result = user.toObject();
                return result;
            }
            throw new BadRequestException('Invalid username or password');
        }
    }

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
            allows: [
                {
                    user_id: userDB._id.toString(),
                    read: [Allow.AUTH],
                    edit: [Allow.AUTH],
                },
            ],
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
            googleId: user.googleId,
            email: user.email,
            name: user.name,
            password: '',
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
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
