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
import { ApiMetaSchema } from '../../../types/dto';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { MedicineType, StorageCondition, DayOfWeek } from '../../../types/medicine';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicines', timestamps: true })
export class Medicine extends ApiMetaSchema {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    brand?: string;

    @Prop({ type: String })
    barcode?: string;

    @Prop({ type: String })
    qrCode?: string;

    @Prop({ type: [String] })
    imageUrl?: string[];

    @Prop({ type: String })
    category?: string;

    @Prop({ type: String })
    genericName?: string;

    @Prop({ type: String })
    storageNotes?: string;

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: Boolean, required: true })
    isCompleted: boolean;

    @Prop({ type: String, enum: MedicineType, required: true })
    type: MedicineType;

    @Prop({ type: Date })
    startDate?: Date;

    @Prop({ type: Date })
    endDate?: Date;

    @Prop({ type: Date })
    expiryDate?: Date;

    @Prop({ type: Object })
    dosage: MedicineDosageDto;

    @Prop({ type: Object })
    package: PackageInfoDto;

    @Prop({ type: Object })
    hospital: HospitalInfoDto;

    @Prop({ type: [Object] })
    warnings: WarningDto[];

    @Prop({ type: [Object] })
    sideEffects: SideEffectDto[];

    @Prop({ type: [Object] })
    takeInstructions: TakeInstructionDto[];

    @Prop({ type: [String], enum: StorageCondition })
    storageConditions: StorageCondition[];

    @Prop({ type: [String], enum: DayOfWeek })
    frequencyDays: DayOfWeek[];
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
