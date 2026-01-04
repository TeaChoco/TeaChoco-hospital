//-Path: "TeaChoco-Hospital/server/src/api/appointments/schemas/appointment.schema.ts"
import {
    SymptomDto,
    VitalSignDto,
    FollowUpInfoDto,
    InsuranceInfoDto,
    StatusHistoryDto,
    AppointmentNoteDto,
    MedicalRecordRefDto,
    AppointmentPaymentDto,
    AppointmentPreparationDto,
} from '../dto/appointment';
import {
    PatientType,
    UrgencyLevel,
    AppointmentType,
    AppointmentStatus,
    AppointmentLocation,
} from '../../../types/appointment';
import { Document } from 'mongoose';
import { ApiMetaSchema } from '../../../types/dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ collection: 'appointments', timestamps: true })
export class Appointment extends ApiMetaSchema {
    @Prop({ type: String })
    appointmentNumber?: string;

    @Prop({ type: String, enum: PatientType, required: true })
    patientType: PatientType;

    @Prop({ type: String, required: true })
    hospitalId: string;

    @Prop({ type: String, required: true })
    doctor_id: string;

    @Prop({ type: String, required: true })
    department: string;

    @Prop({ type: String, enum: AppointmentType, required: true })
    type: AppointmentType;

    @Prop({ type: String })
    subType?: string;

    @Prop({ type: String, required: true })
    purpose: string;

    @Prop({ type: String })
    description?: string;

    @Prop({ type: Date, required: true })
    scheduledDate: Date;

    @Prop({ type: Date, required: true })
    scheduledTime: Date;

    @Prop({ type: Number, required: true })
    expectedDuration: number;

    @Prop({ type: Date })
    actualStartTime?: Date;

    @Prop({ type: Date })
    actualEndTime?: Date;

    @Prop({ type: Date })
    checkInTime?: Date;

    @Prop({ type: Date })
    checkOutTime?: Date;

    @Prop({ type: String, enum: AppointmentLocation, required: true })
    location: AppointmentLocation;

    @Prop({ type: String })
    roomNumber?: string;

    @Prop({ type: String })
    floor?: string;

    @Prop({ type: String, enum: AppointmentStatus, required: true })
    status: AppointmentStatus;

    @Prop({ type: [Object] })
    statusHistory?: StatusHistoryDto[];

    @Prop({ type: String, enum: UrgencyLevel, required: true })
    urgency: UrgencyLevel;

    @Prop({ type: Number })
    priority?: number;

    @Prop({ type: Object })
    preparation: AppointmentPreparationDto;

    @Prop({ type: Boolean, default: false })
    remindersSent: boolean;

    @Prop({ type: [Object] })
    symptoms: SymptomDto[];

    @Prop({ type: String })
    preliminaryDiagnosis?: string;

    @Prop({ type: Object })
    payment: AppointmentPaymentDto;

    @Prop({ type: Object })
    insurance?: InsuranceInfoDto;

    @Prop({ type: [String] })
    prescribedMedicines?: string[];

    @Prop({ type: String })
    treatmentPlan?: string;

    @Prop({ type: [Object] })
    vitalSigns?: VitalSignDto[];

    @Prop({ type: [Object] })
    labResults?: MedicalRecordRefDto[];

    @Prop({ type: [Object] })
    imagingResults?: MedicalRecordRefDto[];

    @Prop({ type: Object })
    followUp: FollowUpInfoDto;

    @Prop({ type: String })
    nextAppointmentId?: string;

    @Prop({ type: [Object] })
    doctorNotes?: AppointmentNoteDto[];

    @Prop({ type: [Object] })
    nurseNotes?: AppointmentNoteDto[];

    @Prop({ type: [Object] })
    patientNotes?: AppointmentNoteDto[];

    @Prop({ type: String })
    referralFrom?: string;

    @Prop({ type: String })
    referralTo?: string;

    @Prop({ type: String })
    previousAppointmentId?: string;

    @Prop({ type: String })
    cancelledBy?: string;

    @Prop({ type: String })
    cancellationReason?: string;

    @Prop({ type: String })
    noShowReason?: string;

    @Prop({ type: [String] })
    escorts?: string[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
