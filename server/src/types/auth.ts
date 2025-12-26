//-Path: "TeaChoco-Hospital/server/src/types/auth.ts"
import { ReqUserDto } from '../user/dto/user.dto';

export enum Allow {
    AUTH = 'auth',
    HOSPITALS = 'hospitals',
    APPOINTMENTS = 'appointments',
    DOCTORS = 'doctors',
    MEDICINES = 'medicines',
    CALENDARS = 'calendars',
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    VISITOR = 'visitor',
}

export type Auth = ReqUserDto | null;
