//-Path: "TeaChoco-Hospital/server/src/user/dto/user.dto.ts"

export interface Allow {
    read: string[];
    edit: string[];
}

export class ReqUserDto {
    readonly user_id: number;
    readonly googleId: string;
    readonly email: string;
    readonly name: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly picture: string;
    readonly locale: string;
    readonly gender: string;
    readonly birthday: string;
    readonly allows: Allow[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly lastLoginAt: Date;
}

export type Auth = ReqUserDto | null;
