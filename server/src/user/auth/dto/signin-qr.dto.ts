//-Path: "TeaChoco-Hospital/server/src/user/auth/dto/signin-qr.dto.ts"
import { IsDate, IsObject, IsString } from 'class-validator';
import { ReqUserDto } from '../../dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum SiginQrType {
    AuthScanUnauth = 'auth-scan-unauth',
    UnauthScanAuth = 'unauth-scan-auth',
}

export class RequestDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'socketId',
        description: 'Socket ID',
    })
    socketId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'token',
        description: 'Token',
    })
    token: string;
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

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: 'expiresAt',
        description: 'Expires at',
    })
    expiresAt: Date;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'socketId',
        description: 'Socket ID',
    })
    socketId: string;

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
