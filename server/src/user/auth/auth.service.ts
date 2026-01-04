//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.service.ts"
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { Allow } from '../../types/auth';
import { JwtService } from '@nestjs/jwt';
import { nameDB } from '../../hooks/mongodb';
import { ReqUserDto } from '../dto/user.dto';
import { UserService } from '../user.service';
import { InjectModel } from '@nestjs/mongoose';
import { SiginQrDto } from './dto/signin-qr.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { SecureService } from '../../secure/secure.service';
import { User, UserDocument } from '../schemas/user.schema';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly secureService: SecureService,
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async signinQr(
        data: SiginQrDto,
    ): Promise<{ access_token: string; user: ResponseUserDto | null; maxAge: number } | undefined> {
        if (!data.request || !data.response) return;
        const save = await this.cacheManager.get<SiginQrDto>(`signin-qr_${data.request.socketId}`);
        this.logger.log(data);
        if (!save) throw new NotFoundException('Save not found');
        if (
            save.request &&
            save.response &&
            data.request.token === save.request.token &&
            data.response.token === save.response.token &&
            data.request.socketId === save.request.socketId &&
            data.response.socketId === save.response.socketId
        ) {
            this.logger.log('signin-qr', save);
            this.cacheManager.del(`signin-qr_${data.request.socketId}`);
            const result = await this.signin(save.response.user);
            const maxAge = new Date(save.response.user.expiresAt).getTime() - Date.now();
            return { ...result, maxAge };
        }
    }

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

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        if (responseUser) responseUser.expiresAt = expiresAt;
        const payload: ReqUserDto = {
            user_id: userDB._id.toString(),
            googleId: userDB.googleId,
            email: userDB.email,
            name: userDB.name,
            firstName: userDB.firstName,
            lastName: userDB.lastName,
            picture: userDB.picture,
            allows: [],
            role: userDB.role,
            createdAt: userDB.createdAt,
            updatedAt: userDB.updatedAt,
            expiresAt,
            lastLoginAt: userDB.lastLoginAt,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: responseUser,
        };
    }

    async signup(user: ReqUserDto) {
        const newUserData: User = {
            googleId: user.googleId,
            email: user.email,
            name: user.name,
            password: '',
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            lastLoginAt: new Date(),
        };
        const newUser = new this.userModel(newUserData);
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
