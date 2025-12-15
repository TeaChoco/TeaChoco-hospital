//-Path: "TeaChoco-Hospital/client/src/types/doctor.ts"

export interface Doctor {
    _id: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    hospitalId: string;
    department: string;
    contactNumber?: string;
    picture?: string;
    createdAt: Date;
    updatedAt: Date;
}
