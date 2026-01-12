//-Path: "TeaChoco-Hospital/server/src/user/dto/response-user.dto.ts"
import { AllowsDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class ResponseUserDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'User ID',
    })
    user_id: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '1234567890',
        description: 'Google ID',
    })
    googleId?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'example@gmail.com',
        description: 'Email',
    })
    email?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John Doe',
        description: 'Name',
    })
    name?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'John',
        description: 'First name',
    })
    firstName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Doe',
        description: 'Last name',
    })
    lastName?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: '1234567890',
        description: 'Picture',
    })
    picture?: string;

    @IsArray()
    @ApiProperty({
        type: [AllowsDto],
        required: false,
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
    allows?: AllowsDto[];

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'admin',
        description: 'Role',
    })
    role?: string;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Expires at',
    })
    expiresAt?: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Created at',
    })
    createdAt?: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Updated at',
    })
    updatedAt?: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Last login at',
    })
    lastLoginAt?: Date;
}

export class QueryOptions {
    @ApiProperty()
    @IsOptional()
    @IsString()
    auth?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    googleId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    picture?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    allows?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    expiresAt?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedAt?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastLoginAt?: string;
}

export class ResponseOptions {
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    auth?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    googleId?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    email?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    name?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    firstName?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    lastName?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    picture?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    allows?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    role?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    createdAt?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    updatedAt?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    expiresAt?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    lastLoginAt?: boolean;
}
