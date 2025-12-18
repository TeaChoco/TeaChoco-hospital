//-Path: "TeaChoco-Hospital/server/src/user/dto/user.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export enum Allow {
    AUTH = 'auth',
    HOSPITALS = 'hospitals',
    APPOINTMENTS = 'appointments',
    DOCTORS = 'doctors',
    MEDICINES = 'medicines',
    CALENDARS = 'calendars',
}

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

export class AllowsDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'User ID',
    })
    user_id: string;

    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        example: [Allow.AUTH],
        description: 'Read',
    })
    read: Allow[];

    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        example: [Allow.AUTH],
        description: 'Edit',
    })
    edit: Allow[];
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
    readonly googleId: string;

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
        example: [{ user_id: '1234567890', read: [Allow.AUTH], edit: [Allow.AUTH] }],
        description: 'Allows',
    })
    readonly allows: AllowsDto[];

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
    readonly googleId: string;

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
        example: [Allow.AUTH],
        description: 'Allows',
    })
    readonly allows: Allow[];

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

export type Auth = ReqUserDto | null;
