//-Path: "TeaChoco-Hospital/server/src/user/auth/dto/signin-qr.dto.ts"
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReqUserDto } from '../../dto/user.dto';
import { IsDate, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';

export enum SiginQrType {
    AuthScanUnauth = 'auth-scan-unauth',
    UnauthScanAuth = 'unauth-scan-auth',
}

export class RequestDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'token',
        description: 'Token',
    })
    token: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'socketId',
        description: 'Socket ID',
    })
    socketId: string;

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: 'expiresAt',
        description: 'Expires at',
    })
    expiresAt: Date;
}

export class ResponseDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'token',
        description: 'Token',
    })
    token: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'socketId',
        description: 'Socket ID',
    })
    socketId: string;

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: 'expiresAt',
        description: 'Expires at',
    })
    expiresAt: Date;

    @IsObject()
    @ApiProperty({
        type: ReqUserDto,
        required: true,
        example: 'user',
        description: 'User',
    })
    user: ReqUserDto;
}

export class SiginQrDto {
    type: SiginQrType;
    request?: RequestDto;
    response?: ResponseDto;
    senderSocketId?: string;
}

export class SigninResultDto {
    @IsObject()
    @IsOptional()
    @ApiProperty({
        type: ReqUserDto,
        example: 'user',
        description: 'User',
    })
    user?: ResponseUserDto;

    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 'maxAge',
        description: 'Max age',
    })
    maxAge: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        example: 'message',
        description: 'Message',
    })
    message?: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'access_token',
        description: 'Access token',
    })
    access_token: string;
}

export function logSiginQr(data?: SiginQrDto): SiginQrDto {
    return {
        type: data?.type || SiginQrType.AuthScanUnauth,
        request: data?.request,
        response: data?.response
            ? { ...data?.response, user: { name: data?.response?.user?.name } as ReqUserDto }
            : undefined,
        senderSocketId: data?.senderSocketId,
    };
}
