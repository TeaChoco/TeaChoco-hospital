//-Path: "TeaChoco-Hospital/server/src/api/medicines/dto/medicine.dto.ts"
import {
    MealTime,
    TimeUnit,
    MedicineUnit,
    FoodRelation,
    SeverityLevel,
    EffectServeriry,
    EffectProbability,
} from '../../../types/medicine';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsObject, IsString } from 'class-validator';

export class TimeIntervalDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'Value',
    })
    value: number;

    @IsEnum(TimeUnit)
    @ApiProperty({
        type: String,
        required: true,
        example: 'minutes',
        description: 'Unit',
    })
    unit: TimeUnit;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'description',
        description: 'Description',
    })
    description?: string;
}

export class TakeInstructionDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'notes',
        description: 'Notes',
    })
    notes?: string;

    @IsEnum(MealTime)
    @ApiProperty({
        type: String,
        required: true,
        example: 'breakfast',
        description: 'Meal time',
    })
    mealTime: MealTime;

    @IsEnum(FoodRelation)
    @ApiProperty({
        type: String,
        required: true,
        example: 'before',
        description: 'Food relation',
    })
    relation: FoodRelation;

    @IsObject()
    @ApiProperty({
        type: TimeIntervalDto,
        required: false,
        example: {},
        description: 'Interval',
    })
    interval?: TimeIntervalDto;
}

export class MedicineDosageDto {
    @IsEnum(MedicineUnit)
    @ApiProperty({
        type: String,
        required: true,
        example: 'tablet',
        description: 'Unit',
    })
    unit: MedicineUnit;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'Quantity',
    })
    quantity: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'Frequency per day',
    })
    frequencyPerDay: number;

    @IsObject()
    @ApiProperty({
        type: Object,
        required: false,
        example: {
            value: 1,
            unit: 'day',
        },
        description: 'Duration',
    })
    duration?: {
        value: number;
        unit: TimeUnit;
    };

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Maximum dosage',
    })
    maximumDosage?: number;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'instructions',
        description: 'Instructions',
    })
    instructions?: string;
}

export class PackageInfoDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Boxes',
    })
    boxes?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Strips per box',
    })
    stripsPerBox?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'Tablets per strip',
    })
    tabletsPerStrip: number;
}

export class HospitalInfoDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'hospitalId',
        description: 'Hospital ID',
    })
    hospitalId: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'doctorId',
        description: 'Doctor ID',
    })
    doctorId?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'department',
        description: 'Department',
    })
    department?: string;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Prescription date',
    })
    prescriptionDate: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Dispense date',
    })
    dispenseDate: Date;
}

export class SideEffectDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'description',
        description: 'Description',
    })
    description: string;

    @IsEnum(EffectServeriry)
    @ApiProperty({
        type: String,
        required: true,
        example: EffectServeriry.MILD,
        description: 'Severity',
    })
    severity: EffectServeriry;

    @IsEnum(EffectProbability)
    @ApiProperty({
        type: String,
        required: true,
        example: EffectProbability.RARE,
        description: 'Probability',
    })
    probability: EffectProbability;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'action',
        description: 'Action',
    })
    action?: string;
}

export class WarningDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'description',
        description: 'Description',
    })
    description: string;

    @IsEnum(SeverityLevel)
    @ApiProperty({
        type: String,
        required: true,
        example: SeverityLevel.INFO,
        description: 'Severity',
    })
    severity: SeverityLevel;
}
