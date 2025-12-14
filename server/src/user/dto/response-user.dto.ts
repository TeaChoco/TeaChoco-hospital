//-Path: "TeaChoco-Hospital/server/src/user/dto/response-user.dto.ts"
import { Allow } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ResponseUserDto {
    user_id: string;
    googleId?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    locale?: string;
    gender?: string;
    birthday?: string;
    allows?: Allow[];
    createdAt?: Date;
    updatedAt?: Date;
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
    locale?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    gender?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    birthday?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    allows?: string;

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
    auth?: boolean;
    googleId?: boolean;
    email?: boolean;
    name?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    picture?: boolean;
    locale?: boolean;
    gender?: boolean;
    birthday?: boolean;
    allows?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lastLoginAt?: boolean;
}
