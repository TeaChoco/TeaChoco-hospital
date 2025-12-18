//- Path: "TeaChoco-Hospital/server/src/api/doctors/schemas/doctor.schema.ts"
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ collection: 'doctors', timestamps: true })
export class Doctor {
    @Prop()
    user_id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    nickname?: string;

    @Prop()
    hospitalId: string;

    @Prop()
    department: string;

    @Prop()
    contactNumber?: string;

    @Prop()
    picture?: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
