//-Path: "motiva/client/src/types/types.ts"
import { ReqUserDto } from '../../dto/user.dto';

export class SubmitDto {
    socketId: string;
    token: string;
    user: ReqUserDto;
}

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
    submit?: SubmitDto;
    request?: RequestDto;
    response?: ResponseDto;
}
