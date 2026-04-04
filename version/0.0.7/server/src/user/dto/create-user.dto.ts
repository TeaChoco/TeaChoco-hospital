//-Path: "motiva/server/src/user/dto/create-user.dto.ts"
import { Role } from '../../types/auth';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { AllowsDto } from './user.dto';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'Google ID',
    })
    googleId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'test@gmail.com',
        description: 'Email',
    })
    email: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'John Doe',
        description: 'Name',
    })
    name: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'John',
        description: 'First name',
    })
    firstName: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Doe',
        description: 'Last name',
    })
    lastName: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'https://example.com/profile.jpg',
        description: 'Profile picture URL',
    })
    picture: string;

    @IsArray()
    @ApiProperty({
        type: [AllowsDto],
        isArray: true,
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
    allows: AllowsDto[];

    @IsEnum(Role)
    @ApiProperty({
        enum: Role,
        required: true,
        example: Role.USER,
        description: 'Role',
    })
    role: Role;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1633036800,
        description: 'Last login timestamp',
    })
    lastLoginAt: number;
}

export class Tokens {
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1633036800,
        description: 'Expires at timestamp',
    })
    expiresAt: number;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'access-token-12345',
        description: 'Access token',
    })
    accessToken: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'refresh-token-12345',
        description: 'Refresh token',
    })
    refreshToken: string;
}

export type UserType = CreateUserDto & Tokens;
