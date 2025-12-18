//-Path: "TeaChoco-Hospital/server/src/api/hospitals/schemas/hospital.schema.ts"
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HospitalDocument = Hospital & Document;

@Schema({ collection: 'hospitals', timestamps: true })
export class Hospital {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    address?: string;

    @Prop({ required: false })
    contactNumber?: string;

    @Prop({ required: false })
    website?: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
