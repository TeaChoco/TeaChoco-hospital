//-Path: "TeaChoco-Hospital/server/src/user/user.service.ts"
import { Model, Types } from 'mongoose';
import { nameDB } from 'src/hooks/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { QueryOptions, ResponseOptions, ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name, nameDB)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async responseUser(
        options: ResponseOptions = {},
        user?: UserDocument | null,
    ): Promise<ResponseUserDto | null> {
        if (user) {
            const responseUser: ResponseUserDto = {
                user_id: user._id.toString(),
            };
            const keys: (keyof ResponseOptions)[] = [
                'googleId',
                'email',
                'name',
                'firstName',
                'lastName',
                'picture',
                'locale',
                'gender',
                'birthday',
                'allows',
                'createdAt',
                'updatedAt',
                'lastLoginAt',
            ];
            keys.forEach((key) => {
                if (options[key] || options.auth) responseUser[key] = user[key];
            });
            return responseUser;
        }
        return null;
    }

    options(querys: QueryOptions): ResponseOptions | undefined {
        const {
            auth,
            googleId,
            email,
            name,
            firstName,
            lastName,
            picture,
            locale,
            gender,
            birthday,
            allows,
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
            locale: locale !== undefined,
            gender: gender !== undefined,
            birthday: birthday !== undefined,
            allows: allows !== undefined,
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
