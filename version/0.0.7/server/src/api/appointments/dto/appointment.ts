//-Path: "TeaChoco-Hospital/server/src/api/appointments/dto/appointment.ts"
import {
    IsDate,
    IsEnum,
    IsArray,
    IsNumber,
    IsString,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import {
    CategoryType,
    PaymentMethod,
    PaymentStatus,
    PreparationType,
    AppointmentStatus,
} from '../../../types/appointment';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentPreparationDto {
    @IsArray()
    @ApiProperty({
        type: [String],
        enum: PreparationType,
        example: [PreparationType.FASTING],
        description: 'Types of preparation',
    })
    types: PreparationType[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        example: 'Description of preparation',
        description: 'Description of preparation',
    })
    description?: string;

    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        example: ['Instruction 1', 'Instruction 2'],
        description: 'Instructions for preparation',
    })
    instructions: string[];

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 8,
        description: 'Fasting hours',
    })
    fastingHours?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Medication instructions',
        description: 'Medication instructions',
    })
    medicationInstructions?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Special notes',
        description: 'Special notes',
    })
    specialNotes?: string;
}

export class InsuranceInfoDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Provider ID',
        description: 'Provider ID',
    })
    providerId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Provider name',
        description: 'Provider name',
    })
    providerName: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Policy number',
        description: 'Policy number',
    })
    policyNumber: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Coverage type',
        description: 'Coverage type',
    })
    coverageType: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 100,
        description: 'Coverage amount',
    })
    coverageAmount?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 100,
        description: 'Remaining amount',
    })
    remainingAmount?: number;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Is verified',
    })
    isVerified: boolean;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Verification date',
    })
    verificationDate?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Notes',
        description: 'Notes',
    })
    notes?: string;
}

export class AppointmentPaymentDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 100,
        description: 'Total amount',
    })
    totalAmount: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 100,
        description: 'Insurance coverage',
    })
    insuranceCoverage?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 100,
        description: 'Patient responsibility',
    })
    patientResponsibility: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 100,
        description: 'Discount',
    })
    discount?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 100,
        description: 'VAT',
    })
    vat?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 100,
        description: 'Net amount',
    })
    netAmount: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 100,
        description: 'Paid amount',
    })
    paidAmount: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 100,
        description: 'Balance',
    })
    balance: number;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Payment status',
        description: 'Payment status',
    })
    paymentStatus: PaymentStatus;

    @IsArray()
    @IsOptional()
    @ApiProperty({
        type: [String],
        required: false,
        example: [PaymentMethod.CASH],
        description: 'Payment method',
    })
    paymentMethod?: PaymentMethod[];

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Payment date',
    })
    paymentDate?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Transaction ID',
        description: 'Transaction ID',
    })
    transactionId?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Receipt number',
        description: 'Receipt number',
    })
    receiptNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Notes',
        description: 'Notes',
    })
    notes?: string;
}

export class SymptomDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Symptom description',
        description: 'Symptom description',
    })
    description: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'mild',
        description: 'Symptom severity',
    })
    severity: 'mild' | 'moderate' | 'severe';

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Symptom duration',
        description: 'Symptom duration',
    })
    duration?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Symptom onset',
    })
    onset?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Symptom notes',
        description: 'Symptom notes',
    })
    notes?: string;
}

export class VitalSignDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Blood pressure',
        description: 'Blood pressure',
    })
    bloodPressure?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 60,
        description: 'Heart rate',
    })
    heartRate?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 16,
        description: 'Respiratory rate',
    })
    respiratoryRate?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 37,
        description: 'Temperature',
    })
    temperature?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 98,
        description: 'Oxygen saturation',
    })
    oxygenSaturation?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 70,
        description: 'Weight',
    })
    weight?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 180,
        description: 'Height',
    })
    height?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        required: false,
        example: 25,
        description: 'BMI',
    })
    bmi?: number;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Measured at',
    })
    measuredAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Measured by',
        description: 'Measured by',
    })
    measuredBy?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Notes',
        description: 'Notes',
    })
    notes?: string;
}

export class MedicalRecordRefDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Record ID',
        description: 'Record ID',
    })
    recordId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Type',
        description: 'Type',
    })
    type: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Title',
        description: 'Title',
    })
    title: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Date',
    })
    date: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Attachment URL',
        description: 'Attachment URL',
    })
    attachmentUrl?: string;
}

export class FollowUpInfoDto {
    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Is required',
    })
    isRequired: boolean;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2022-01-01',
        description: 'Recommended date',
    })
    recommendedDate?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Reason',
        description: 'Reason',
    })
    reason?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Instructions',
        description: 'Instructions',
    })
    instructions?: string;
}

export class AppointmentNoteDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '12345678',
        description: 'Note ID',
    })
    noteId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Content',
        description: 'Content',
    })
    content: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Author',
        description: 'Author',
    })
    author: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Created at',
    })
    createdAt: Date;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Is internal',
    })
    isInternal: boolean;

    @IsEnum(CategoryType)
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'doctor',
        description: 'Category',
    })
    category?: CategoryType;
}

export class StatusHistoryDto {
    @IsEnum(AppointmentStatus)
    @ApiProperty({
        enum: AppointmentStatus,
        description: 'Status',
        example: AppointmentStatus.PENDING,
    })
    status: AppointmentStatus;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Changed by (User ID)',
        example: '123456789',
    })
    changedBy: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        description: 'Changed at',
        example: '2024-01-01T00:00:00Z',
    })
    changedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        description: 'Notes',
        example: 'Status changed',
    })
    notes?: string;
}

export class MedicalCertificateDto {
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-03-31',
        description: 'End date',
    })
    endDate?: Date;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Dr. Jane Smith',
        description: 'Issuer (Doctor Name)',
    })
    issuer: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        example: '2024-03-29',
        description: 'Issued at',
    })
    issuedAt: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: false,
        example: '2024-03-29',
        description: 'Start date',
    })
    startDate?: Date;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Common cold',
        description: 'Diagnosis',
    })
    diagnosis: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'CERT-2024-001',
        description: 'Certificate ID',
    })
    certificateId: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Rest for 3 days',
        description: 'Recommendations',
    })
    recommendations: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'https://cdn.example.com/certs/123.pdf',
        description: 'Attachment URL',
    })
    attachmentUrl?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        description: 'Image URL',
        example: 'https://cdn.example.com/certs/123.jpg',
    })
    imgUrl?: string;
}
