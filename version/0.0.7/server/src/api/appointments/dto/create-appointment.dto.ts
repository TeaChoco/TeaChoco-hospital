//-Path: "TeaChoco-Hospital/server/src/api/appointments/dto/create-appointment.dto.ts"
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
} from './appointment';
import {
    IsDate,
    IsEnum,
    IsArray,
    IsString,
    IsNumber,
    IsBoolean,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import {
    PatientType,
    UrgencyLevel,
    AppointmentType,
    AppointmentStatus,
    AppointmentLocation,
} from '../../../types/appointment';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ApiMetaDto } from '../../../types/dto';

export class CreateAppointmentDto extends ApiMetaDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'APT-2024-001',
        description: 'Appointment number',
    })
    appointmentNumber?: string;

    @IsEnum(PatientType)
    @ApiProperty({
        type: String,
        enum: PatientType,
        example: PatientType.NEW,
        description: 'Patient type',
    })
    patientType: PatientType;

    @IsString()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'Hospital ID',
    })
    hospitalId: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'Doctor ID',
    })
    doctor_id: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Department',
        description: 'Department',
    })
    department: string;

    @IsEnum(AppointmentType)
    @ApiProperty({
        type: String,
        enum: AppointmentType,
        description: 'Appointment type',
        example: AppointmentType.CONSULTATION,
    })
    type: AppointmentType;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'SubType',
        description: 'SubType',
    })
    subType?: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Purpose',
        description: 'Purpose',
    })
    purpose: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Description',
        description: 'Description',
    })
    description?: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        example: '2024-01-01T00:00:00Z',
        description: 'Scheduled Date',
    })
    scheduledDate: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        example: '2024-01-01T00:00:00Z',
        description: 'Scheduled Time',
    })
    scheduledTime: Date;

    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 30,
        description: 'Expected duration (minutes)',
    })
    expectedDuration: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-01-01T00:00:00Z',
        description: 'Actual Start Time',
    })
    actualStartTime?: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-01-01T00:00:00Z',
        description: 'Actual End Time',
    })
    actualEndTime?: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-01-01T00:00:00Z',
        description: 'Check In Time',
    })
    checkInTime?: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-01-01T00:00:00Z',
        description: 'Check Out Time',
    })
    checkOutTime?: Date;

    @IsEnum(AppointmentLocation)
    @ApiProperty({
        enum: AppointmentLocation,
        description: 'Appointment location',
        example: AppointmentLocation.OPD,
    })
    location: AppointmentLocation;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Room Number',
        description: 'Room Number',
    })
    roomNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'floor',
        description: 'Floor',
    })
    floor?: string;

    @IsEnum(AppointmentStatus)
    @ApiProperty({
        enum: AppointmentStatus,
        description: 'Appointment status',
        example: AppointmentStatus.PENDING,
    })
    status: AppointmentStatus;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => StatusHistoryDto)
    @ApiProperty({
        type: [StatusHistoryDto],
        required: false,
        description: 'Status history',
    })
    statusHistory?: StatusHistoryDto[];

    @IsEnum(UrgencyLevel)
    @ApiProperty({
        enum: UrgencyLevel,
        description: 'Urgency level',
        example: UrgencyLevel.ROUTINE,
    })
    urgency: UrgencyLevel;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Priority',
    })
    priority?: number;

    @ValidateNested()
    @Type(() => AppointmentPreparationDto)
    @ApiProperty({
        type: AppointmentPreparationDto,
        description: 'Preparation information',
    })
    preparation: AppointmentPreparationDto;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        example: false,
        description: 'Reminders sent',
    })
    remindersSent: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SymptomDto)
    @ApiProperty({
        type: [SymptomDto],
        description: 'Symptoms',
    })
    symptoms: SymptomDto[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Diagnosis',
        description: 'Preliminary Diagnosis',
    })
    preliminaryDiagnosis?: string;

    @ValidateNested()
    @Type(() => AppointmentPaymentDto)
    @ApiProperty({
        type: AppointmentPaymentDto,
        description: 'Payment information',
    })
    payment: AppointmentPaymentDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => InsuranceInfoDto)
    @ApiProperty({
        type: InsuranceInfoDto,
        required: false,
        description: 'Insurance information',
    })
    insurance?: InsuranceInfoDto;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ApiProperty({
        type: [String],
        required: false,
        example: ['123456789'],
        description: 'Prescribed medicine IDs',
    })
    prescribedMedicines?: string[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Treatment Plan',
        description: 'Treatment Plan',
    })
    treatmentPlan?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => VitalSignDto)
    @ApiProperty({
        type: [VitalSignDto],
        required: false,
        description: 'Vital signs',
    })
    vitalSigns?: VitalSignDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MedicalRecordRefDto)
    @ApiProperty({
        type: [MedicalRecordRefDto],
        required: false,
        description: 'Lab results',
    })
    labResults?: MedicalRecordRefDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MedicalRecordRefDto)
    @ApiProperty({
        type: [MedicalRecordRefDto],
        required: false,
        description: 'Imaging results',
    })
    imagingResults?: MedicalRecordRefDto[];

    @ValidateNested()
    @Type(() => FollowUpInfoDto)
    @ApiProperty({
        type: FollowUpInfoDto,
        description: 'Follow up information',
    })
    followUp: FollowUpInfoDto;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: '123456789',
        description: 'Next appointment ID',
    })
    nextAppointmentId?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AppointmentNoteDto)
    @ApiProperty({
        type: [AppointmentNoteDto],
        required: false,
        description: 'Doctor notes',
    })
    doctorNotes?: AppointmentNoteDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AppointmentNoteDto)
    @ApiProperty({
        type: [AppointmentNoteDto],
        required: false,
        description: 'Nurse notes',
    })
    nurseNotes?: AppointmentNoteDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AppointmentNoteDto)
    @ApiProperty({
        type: [AppointmentNoteDto],
        required: false,
        description: 'Notes from patient',
    })
    patientNotes?: AppointmentNoteDto[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Referral From',
        description: 'Referral From',
    })
    referralFrom?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Referral To',
        description: 'Referral To',
    })
    referralTo?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: '123456789',
        description: 'Previous appointment ID',
    })
    previousAppointmentId?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: '123456789',
        description: 'Cancelled By',
    })
    cancelledBy?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Reason',
        description: 'Cancellation Reason',
    })
    cancellationReason?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'No Show Reason',
        description: 'No Show Reason',
    })
    noShowReason?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ApiProperty({
        type: [String],
        required: false,
        example: ['Escort 1'],
        description: 'Escorts',
    })
    escorts?: string[];
}
