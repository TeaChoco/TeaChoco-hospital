//- Path: "TeaChoco-Hospital/server/src/api/doctors/schemas/doctor.schema.ts"
import { Document } from 'mongoose';
import { ApiMetaSchema } from '../../../types/dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ collection: 'doctors', timestamps: true })
export class Doctor extends ApiMetaSchema {
    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: String })
    nickname?: string;

    @Prop({ type: String, required: true })
    hospitalId: string;

    @Prop({ type: String, required: true })
    department: string;

    @Prop({ type: String })
    contactNumber?: string;

    @Prop({ type: String })
    picture?: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
