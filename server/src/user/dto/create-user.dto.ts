//-Path: "motiva/server/src/user/dto/create-user.dto.ts"
import { Allow } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

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
        type: [String],
        isArray: true,
        required: true,
        example: [''],
        description: 'Allows',
    })
    allows: Allow[];

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
