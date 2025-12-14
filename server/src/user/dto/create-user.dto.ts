//-Path: "motiva/server/src/user/dto/create-user.dto.ts"
import { Allow } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'google-unique-id-12345',
        description: 'Google ID',
    })
    readonly googleId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'test@gmail.com',
        description: 'Email',
    })
    readonly email: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'John Doe',
        description: 'Name',
    })
    readonly name: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'John',
        description: 'First name',
    })
    readonly firstName: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Doe',
        description: 'Last name',
    })
    readonly lastName: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'https://example.com/profile.jpg',
        description: 'Profile picture URL',
    })
    readonly picture: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'en',
        description: 'Locale',
    })
    readonly locale: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'male',
        description: 'Gender',
    })
    readonly gender: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1990-01-01',
        description: 'Birthday',
    })
    readonly birthday: string;

    @IsArray()
    @ApiProperty({
        type: [String],
        isArray: true,
        required: true,
        example: [''],
        description: 'Allows',
    })
    readonly allows: Allow[];

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1633036800,
        description: 'Last login timestamp',
    })
    readonly lastLoginAt: number;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
