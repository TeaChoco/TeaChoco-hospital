//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.service.ts"
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { nameDB } from '../../hooks/mongodb';
import { ReqUserDto } from '../dto/user.dto';
import { UserService } from '../user.service';
import { InjectModel } from '@nestjs/mongoose';
import { SiginQrDto, SigninQrResultDto } from './dto/signin-qr.dto';
import { CookieOptions, Response } from 'express';
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

    get cookieOption(): CookieOptions {
        const isDev = this.secureService.isDev();
        return {
            secure: !isDev,
            httpOnly: true,
            sameSite: isDev ? 'lax' : 'none',
        };
    }

    setCookie(res: Response, token: string, maxAge: number) {
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        const finalMaxAge = !isNaN(maxAge) && maxAge > 0 ? maxAge : sevenDays;
        res.cookie('access_token', token, { maxAge: finalMaxAge, ...this.cookieOption });
    }

    clearCookie(res: Response) {
        res.clearCookie('access_token', this.cookieOption);
    }

    async signinQr(data: SiginQrDto): Promise<SigninQrResultDto> {
        // this.logger.log(logSiginQr(data));
        if (!data.request) throw new BadRequestException('Invalid request data');
        if (!data.response) throw new BadRequestException('Invalid response data');
        const save = await this.cacheManager.get<SiginQrDto>(`signin-qr_${data.request.socketId}`);
        if (!save) throw new NotFoundException('Save not found');
        if (!save.request) throw new BadRequestException('Invalid request save');
        if (!save.response) throw new BadRequestException('Invalid response save');
        if (save.request.token !== data.request.token)
            throw new BadRequestException('Invalid request token');
        if (save.response.token !== data.response.token)
            throw new BadRequestException('Invalid response token');
        if (save.request.socketId !== data.request.socketId)
            throw new BadRequestException('Invalid request socketId');
        if (save.response.socketId !== data.response.socketId)
            throw new BadRequestException('Invalid response socketId');
        if (save.request.expiresAt !== data.request.expiresAt)
            throw new BadRequestException('Invalid request expiresAt');
        if (save.response.expiresAt !== data.response.expiresAt)
            throw new BadRequestException('Invalid response expiresAt');
        const now = Date.now();
        const requestAt = new Date(data.request.expiresAt).getTime();
        const responseAt = new Date(data.response.expiresAt).getTime();
        this.logger.log({
            now,
            requestAt,
            responseAt,
            requestExpiresAt: requestAt < now,
            responseExpiresAt: responseAt < now,
            requestExpiresAtNotEqualResponseExpiresAt: requestAt !== responseAt,
        });
        if (requestAt < now) throw new BadRequestException('request expiresAt is expired');
        if (responseAt < now) throw new BadRequestException('response expiresAt is expired');
        this.cacheManager.del(`signin-qr_${data.request.socketId}`);
        const result = await this.signin(save.response.user);
        const expiresTime = save.response.user?.expiresAt
            ? new Date(save.response.user.expiresAt).getTime()
            : now + 7 * 24 * 60 * 60 * 1000;
        const maxAge = expiresTime - now;
        return { ...result, maxAge } as SigninQrResultDto;
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
            allows: [
                {
                    user_id: userDB._id.toString(),
                    expiresAt,
                    auth: {
                        read: true,
                        edit: true,
                    },
                    doctors: {
                        read: true,
                        edit: true,
                    },
                    hospitals: {
                        read: true,
                        edit: true,
                    },
                    medicines: {
                        read: true,
                        edit: true,
                    },
                    calendars: {
                        read: true,
                        edit: true,
                    },
                    appointments: {
                        read: true,
                        edit: true,
                    },
                },
            ],
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
