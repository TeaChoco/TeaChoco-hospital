//-Path: "TeaChoco-Hospital/client/src/types/hospital.ts"
import type { ApiData } from './types';

export type Hospital = ApiData<{
    name: string;
    address?: string;
    contactNumber?: string;
    website?: string;
}>;
