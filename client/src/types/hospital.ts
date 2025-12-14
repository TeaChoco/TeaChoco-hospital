//-Path: "TeaChoco-Hospital/client/src/types/hospital.ts"

export interface Hospital {
    _id: string;
    name: string;
    address?: string;
    contactNumber?: string;
    website?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
