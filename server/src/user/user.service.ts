//-Path: "TeaChoco-Hospital/server/src/user/user.service.ts"
import { Model, Types } from 'mongoose';
import { nameDB } from '../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { AllowsDto, UserJWTPayload } from './dto/user.dto';
import { QueryOptions, ResponseOptions, ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
    logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async responseUser(
        options: ResponseOptions = {},
        user?: UserJWTPayload | UserDocument | null,
    ): Promise<ResponseUserDto | null> {
        const keys: (keyof ResponseOptions)[] = [
            'googleId',
            'email',
            'name',
            'role',
            'firstName',
            'lastName',
            'picture',
            'expiresAt',
            'allows',
            'createdAt',
            'updatedAt',
            'lastLoginAt',
        ];
        if (user) {
            const responseUser: ResponseUserDto = {
                user_id: (user as UserDocument)._id
                    ? (user as UserDocument)._id.toString()
                    : (user as UserJWTPayload).user_id,
            };

            const allow: AllowsDto = {
                user_id: responseUser.user_id,
                expiresAt: responseUser.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
            };
            keys.forEach((key) => {
                if (options[key] || options.auth)
                    responseUser[key] =
                        key === 'allows'
                            ? (user as UserDocument)._id
                                ? [allow]
                                : (user as UserJWTPayload).allows
                            : user[key];
            });
            return responseUser;
        }
        return null;
    }

    options(querys: QueryOptions): ResponseOptions | undefined {
        const {
            auth,
            name,
            email,
            allows,
            picture,
            googleId,
            lastName,
            expiresAt,
            firstName,
            createdAt,
            updatedAt,
            lastLoginAt,
        } = querys;
        if (Object.keys(querys).length === 0) return undefined;
        return {
            auth: auth !== undefined,
            googleId: googleId !== undefined,
            email: email !== undefined,
            name: name !== undefined,
            firstName: firstName !== undefined,
            lastName: lastName !== undefined,
            picture: picture !== undefined,
            allows: allows !== undefined,
            expiresAt: expiresAt !== undefined,
            createdAt: createdAt !== undefined,
            updatedAt: updatedAt !== undefined,
            lastLoginAt: lastLoginAt !== undefined,
        };
    }

    async findAll(options?: ResponseOptions): Promise<(ResponseUserDto | null)[]> {
        const users = await this.userModel.find().exec();
        return Promise.all(users.map((user) => this.responseUser(options, user)));
    }

    async findUser(user_id: string, options?: ResponseOptions): Promise<ResponseUserDto | null> {
        try {
            const id = new Types.ObjectId(user_id);
            const user = await this.userModel.findById(id).exec();
            return this.responseUser(options, user);
        } catch {
            return null;
        }
    }

    async create(user: CreateUserDto): Promise<User> {
        const result = new this.userModel(user);
        return result.save();
    }

    async update(user_id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({ _id: user_id }, updateUserDto).exec();
    }

    async remove(user_id: string) {
        return this.userModel.findByIdAndDelete(user_id).exec();
    }
}
