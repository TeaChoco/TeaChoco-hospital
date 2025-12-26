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
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';

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

    async signinQr(data: SiginQrDto) {
        if (!data.request || !data.submit) return;
        const submit = await this.cacheManager.get<SiginQrDto>(
            `signin-qr_${data.request.socketId}`,
        );
        this.logger.log(data);

        if (
            submit &&
            submit.submit &&
            submit.request &&
            data.submit.token === submit.submit.token &&
            data.submit.socketId === submit.submit.socketId &&
            data.request.token === submit.request.token &&
            data.request.socketId === submit.request.socketId
        ) {
            this.logger.log('signin-qr', submit);
            this.cacheManager.del(`signin-qr_${data.request.socketId}`);
            const result = await this.signin(submit.submit.user);
            // const maxAge =
            // user?.allows?.[0].expiresAt.getTime() - Date.now() || 7 * 24 * 60 * 60 * 1000;
            return {
                ...result,
                maxAge: submit.submit.user.expiresAt.getTime() - Date.now(),
            };
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
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
