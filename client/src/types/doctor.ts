//-Path: "TeaChoco-Hospital/client/src/types/doctor.ts"
import type { ApiData } from './types';

export type Doctor = ApiData<{
    firstName: string;
    lastName: string;
    nickname?: string;
    hospitalId: string;
    department: string;
    contactNumber?: string;
    picture?: string;
}>;
