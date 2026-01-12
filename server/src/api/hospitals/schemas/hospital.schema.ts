//-Path: "TeaChoco-Hospital/server/src/api/hospitals/schemas/hospital.schema.ts"
import { Document } from 'mongoose';
import { ApiMetaSchema } from '../../../types/dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HospitalDocument = Hospital & Document;

@Schema({ collection: 'hospitals', timestamps: true })
export class Hospital extends ApiMetaSchema {
    @Prop({ required: true })
    name: string;

    @Prop()
    address?: string;

    @Prop()
    contactNumber?: string;

    @Prop()
    website?: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);

HospitalSchema.index({ createdAt: 1 });
