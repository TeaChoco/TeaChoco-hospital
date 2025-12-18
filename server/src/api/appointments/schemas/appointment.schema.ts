//- Path: "TeaChoco-Hospital/server/src/api/appointments/schemas/appointment.schema.ts"
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ collection: 'appointments', timestamps: true })
export class Appointment {
    @Prop()
    user_id: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
