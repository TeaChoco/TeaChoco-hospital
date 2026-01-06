//-Path: "TeaChoco-Hospital/server/src/user/auth/dto/signin-qr.dto.ts"
import { ReqUserDto } from '../../dto/user.dto';

export class RequestDto {
    socketId: string;
    token: string;
}

export class ResponseDto {
    token: string;
    expiresAt: Date;
    socketId: string;
    user: ReqUserDto;
}

export class SiginQrDto {
    request?: RequestDto;
    response?: ResponseDto;
    senderSocketId?: string;
}
