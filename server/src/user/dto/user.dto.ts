//-Path: "TeaChoco-Hospital/server/src/user/dto/user.dto.ts"
import {
    IsDate,
    IsEnum,
    IsArray,
    IsNumber,
    IsObject,
    IsString,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import { Role } from '../../types/auth';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @IsString()
    @ApiProperty({
        description: 'Email',
        example: 'test@gmail.com',
        default: 'test@gmail.com',
    })
    readonly email: string;

    @IsString()
    @ApiProperty({
        description: 'Password',
        example: 'password',
        default: 'password',
    })
    readonly password: string;
}

export class AllowDto {
    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        type: Boolean,
        example: true,
        description: 'Read',
    })
    read?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        type: Boolean,
        example: true,
        description: 'Edit',
    })
    edit?: boolean;
}

export class AllowsDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'User ID',
    })
    user_id: string;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Expires at',
    })
    expiresAt: Date;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    auth?: AllowDto;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    hospitals?: AllowDto;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    appointments?: AllowDto;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    doctors?: AllowDto;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    medicines?: AllowDto;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: Object,
        required: false,
        example: { read: true, edit: true },
        description: 'Allows',
    })
    calendars?: AllowDto;
}

export class ReqUserDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'User ID',
    })
    readonly user_id: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '1234567890',
        description: 'Google ID',
    })
    readonly googleId?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'example@gmail.com',
        description: 'Email',
    })
    readonly email: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John Doe',
        description: 'Name',
    })
    readonly name: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John',
        description: 'First name',
    })
    readonly firstName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Doe',
        description: 'Last name',
    })
    readonly lastName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John',
        description: 'Picture',
    })
    readonly picture?: string;

    @IsArray()
    @ApiProperty({
        type: [AllowsDto],
        required: true,
        example: [
            {
                user_id: '1234567890',
                expiresAt: '2022-01-01',
                auth: { read: true, edit: true },
                hospitals: { read: true, edit: true },
                appointments: { read: true, edit: true },
                doctors: { read: true, edit: true },
                medicines: { read: true, edit: true },
                calendars: { read: true, edit: true },
            },
        ],
        description: 'Allows',
    })
    readonly allows: AllowsDto[];

    @IsEnum(Role)
    @ApiProperty({
        type: String,
        required: true,
        example: 'admin',
        description: 'Role',
    })
    readonly role: Role;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Created at',
    })
    readonly createdAt?: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Updated at',
    })
    readonly updatedAt?: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Expires at',
    })
    readonly expiresAt: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Last login at',
    })
    readonly lastLoginAt: Date;
}

export class UserJWTPayload {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'User ID',
    })
    readonly user_id: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '1234567890',
        description: 'Google ID',
    })
    readonly googleId?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'example@gmail.com',
        description: 'Email',
    })
    readonly email: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John Doe',
        description: 'Name',
    })
    readonly name: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John',
        description: 'First name',
    })
    readonly firstName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Doe',
        description: 'Last name',
    })
    readonly lastName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John',
        description: 'Picture',
    })
    readonly picture?: string;

    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        example: [
            {
                user_id: '1234567890',
                expiresAt: '2022-01-01',
                auth: { read: true, edit: true },
                hospitals: { read: true, edit: true },
                appointments: { read: true, edit: true },
                doctors: { read: true, edit: true },
                medicines: { read: true, edit: true },
                calendars: { read: true, edit: true },
            },
        ],
        description: 'Allows',
    })
    readonly allows: AllowsDto[];

    @IsEnum(Role)
    @ApiProperty({
        type: String,
        required: true,
        example: 'admin',
        description: 'Role',
    })
    readonly role: Role;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '2022-01-01',
        description: 'Created at',
    })
    readonly createdAt?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '2022-01-01',
        description: 'Updated at',
    })
    readonly updatedAt?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '2022-01-01',
        description: 'Expires at',
    })
    readonly expiresAt: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '2022-01-01',
        description: 'Last login at',
    })
    readonly lastLoginAt: string;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'IAT',
    })
    readonly iat: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'EXP',
    })
    readonly exp: number;
}
