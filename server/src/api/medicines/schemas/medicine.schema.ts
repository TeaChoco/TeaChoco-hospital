//-Path: "TeaChoco-Hospital/server/src/api/medicines/schemas/medicine.schema.ts"
import {
    WarningDto,
    SideEffectDto,
    PackageInfoDto,
    HospitalInfoDto,
    MedicineDosageDto,
    TakeInstructionDto,
} from '../dto/medicine.dto';
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { MedicineType, StorageCondition } from '../../../types/medicine';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicines', timestamps: true })
export class Medicine {
    @Prop()
    user_id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    genericName: string;

    @Prop({ type: String })
    brand?: string;

    @Prop({ type: String, enum: MedicineType, required: true })
    type: MedicineType;

    @Prop({ type: String })
    category?: string;

    @Prop({ type: [Object] })
    takeInstructions: TakeInstructionDto[];

    @Prop({ type: Object })
    dosage: MedicineDosageDto;

    @Prop({ type: Date, required: true })
    startDate: Date;

    @Prop({ type: Date, required: true })
    endDate: Date;

    @Prop({ type: Date, required: true })
    expiryDate: Date;

    @Prop({ type: [String], enum: StorageCondition })
    storageConditions: StorageCondition[];

    @Prop({ type: String })
    storageNotes?: string;

    @Prop({ type: Object })
    package: PackageInfoDto;

    @Prop({ type: Object })
    hospital: HospitalInfoDto;

    @Prop({ type: [Object] })
    sideEffects: SideEffectDto[];

    @Prop({ type: [Object] })
    warnings: WarningDto[];

    @Prop({ type: String })
    imageUrl?: string;

    @Prop({ type: String })
    qrCode?: string;

    @Prop({ type: String })
    barcode?: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
