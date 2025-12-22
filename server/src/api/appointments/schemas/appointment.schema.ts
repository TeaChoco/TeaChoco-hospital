//-Path: "TeaChoco-Hospital/server/src/api/appointments/schemas/appointment.schema.ts"
import { Document } from 'mongoose';
import {
    SymptomDto,
    PatientType,
    UrgencyLevel,
    VitalSignDto,
    AppointmentType,
    FollowUpInfoDto,
    InsuranceInfoDto,
    StatusHistoryDto,
    AppointmentStatus,
    AppointmentNoteDto,
    MedicalRecordRefDto,
    AppointmentLocation,
    AppointmentPaymentDto,
    AppointmentPreparationDto,
} from '$/api/appointments/dto/appointment';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ collection: 'appointments', timestamps: true })
export class Appointment {
    @Prop()
    user_id: string;

    @Prop()
    appointmentNumber: string;

    @Prop()
    patientType: PatientType;

    @Prop()
    hospitalId: string;

    @Prop()
    doctor_id: string;

    @Prop()
    department: string;

    @Prop()
    type: AppointmentType;

    @Prop()
    subType: string;

    @Prop()
    purpose: string;

    @Prop()
    description?: string;

    @Prop()
    scheduledDate: Date;

    @Prop()
    scheduledTime: Date;

    @Prop()
    expectedDuration: number;

    @Prop()
    actualStartTime?: Date;

    @Prop()
    actualEndTime?: Date;

    @Prop()
    checkInTime?: Date;

    @Prop()
    checkOutTime?: Date;

    @Prop()
    location: AppointmentLocation;

    @Prop()
    roomNumber: string;

    @Prop()
    floor?: string;

    @Prop()
    status: AppointmentStatus;

    @Prop()
    statusHistory: StatusHistoryDto[];

    @Prop()
    urgency: UrgencyLevel;

    @Prop()
    priority?: number;

    @Prop()
    preparation: AppointmentPreparationDto;

    @Prop()
    remindersSent: boolean;

    @Prop()
    symptoms: SymptomDto[];

    @Prop()
    preliminaryDiagnosis?: string;

    @Prop()
    payment: AppointmentPaymentDto;

    @Prop()
    insurance: InsuranceInfoDto;

    @Prop()
    prescribedMedicines?: string[];

    @Prop()
    treatmentPlan?: string;

    @Prop()
    vitalSigns?: VitalSignDto[];

    @Prop()
    labResults?: MedicalRecordRefDto[];

    @Prop()
    imagingResults?: MedicalRecordRefDto[];

    @Prop()
    followUp: FollowUpInfoDto;

    @Prop()
    nextAppointmentId?: string;

    @Prop()
    doctorNotes?: AppointmentNoteDto[];

    @Prop()
    nurseNotes?: AppointmentNoteDto[];

    @Prop()
    patientNotes?: AppointmentNoteDto[];

    @Prop()
    referralFrom?: string;

    @Prop()
    referralTo?: string;

    @Prop()
    previousAppointmentId?: string;

    @Prop()
    createdBy?: string;

    @Prop()
    updatedBy?: string;

    @Prop()
    cancelledBy?: string;

    @Prop()
    cancellationReason?: string;

    @Prop()
    noShowReason?: string;

    @Prop()
    escorts?: string[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
