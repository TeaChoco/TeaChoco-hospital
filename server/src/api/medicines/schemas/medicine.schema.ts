//-Path: "TeaChoco-Hospital/server/src/api/medicines/schemas/medicine.schema.ts"
import { Document } from 'mongoose';
import {
    WarningDto,
    SideEffectDto,
    PackageInfoDto,
    HospitalInfoDto,
    MedicineDosageDto,
    TakeInstructionDto,
} from '$/api/medicines/dto/medicine.dto';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { MedicineType, StorageCondition } from '$/types/medicine';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicines', timestamps: true })
export class Medicine {
    @Prop()
    user_id: string;

    @Prop()
    name: string;

    @Prop()
    genericName: string;

    @Prop()
    brand?: string;

    @Prop()
    type: MedicineType;

    @Prop()
    category?: string;

    @Prop()
    takeInstructions: TakeInstructionDto[];

    @Prop()
    dosage: MedicineDosageDto;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    expiryDate: Date;

    @Prop()
    storageConditions: StorageCondition[];

    @Prop()
    storageNotes?: string;

    @Prop()
    package: PackageInfoDto;

    @Prop()
    hospital: HospitalInfoDto;

    @Prop()
    sideEffects: SideEffectDto[];

    @Prop()
    warnings: WarningDto[];

    @Prop()
    imageUrl?: string;

    @Prop()
    qrCode?: string;

    @Prop()
    barcode?: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
