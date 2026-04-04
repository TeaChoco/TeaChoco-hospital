//-Path: "TeaChoco-Hospital/server/src/api/medicines/dto/create-medicine.dto.ts"
import {
    WarningDto,
    SideEffectDto,
    PackageInfoDto,
    HospitalInfoDto,
    MedicineDosageDto,
    TakeInstructionDto,
} from './medicine.dto';
import {
    IsDate,
    IsEnum,
    IsArray,
    IsObject,
    IsString,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import {
    MedicineType,
    EffectServeriry,
    StorageCondition,
    EffectProbability,
} from '../../../types/medicine';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ApiMetaDto } from '../../../types/dto';

export class CreateMedicineDto extends ApiMetaDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Paracetamol',
        description: 'Medicine name',
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Generic name',
    })
    genericName?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Brand name',
    })
    brand?: string;

    @IsEnum(MedicineType)
    @ApiProperty({
        type: String,
        required: true,
        enum: MedicineType,
        example: MedicineType.TABLET,
        description: 'Medicine type',
    })
    type: MedicineType;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Category',
    })
    category?: string;

    @IsArray()
    @ApiProperty({
        type: [TakeInstructionDto],
        required: true,
        example: [
            {
                time: '08:00',
                quantity: 1,
                unit: 'tablet',
            },
        ],
        description: 'Take instructions',
    })
    takeInstructions: TakeInstructionDto[];

    @IsObject()
    @ApiProperty({
        type: MedicineDosageDto,
        required: true,
        example: MedicineDosageDto,
        description: 'Dosage',
    })
    dosage: MedicineDosageDto;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Start date',
    })
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'End date',
    })
    endDate: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Expiry date',
    })
    expiryDate: Date;

    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        example: ['room_temp'],
        description: 'Storage conditions',
    })
    storageConditions: StorageCondition[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Storage notes',
    })
    storageNotes?: string;

    @IsObject()
    @ApiProperty({
        type: PackageInfoDto,
        required: true,
        example: PackageInfoDto,
        description: 'Package',
    })
    package: PackageInfoDto;

    @IsObject()
    @ApiProperty({
        type: HospitalInfoDto,
        required: true,
        example: HospitalInfoDto,
        description: 'Hospital',
    })
    hospital: HospitalInfoDto;

    @IsArray()
    @ApiProperty({
        type: [SideEffectDto],
        required: true,
        example: [
            {
                description: 'Drowsiness',
                severity: EffectServeriry.MILD,
                probability: EffectProbability.COMMON,
                action: 'Do not drive',
            },
        ],
        description: 'Side effects',
    })
    sideEffects: SideEffectDto[];

    @IsArray()
    @ApiProperty({
        type: [WarningDto],
        required: true,
        example: [
            {
                description: 'Drowsiness',
                severity: EffectServeriry.MILD,
                probability: EffectProbability.COMMON,
                action: 'Do not drive',
            },
        ],
        description: 'Warnings',
    })
    warnings: WarningDto[];

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'https://example.com/image.jpg',
        description: 'Image URL',
    })
    imageUrl?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'QR code',
    })
    qrCode?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Barcode',
    })
    barcode?: string;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Is active',
    })
    isActive: boolean;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Is completed',
    })
    isCompleted: boolean;
}

export class CreateMedicineManyDto {
    @IsArray()
    @Type(() => CreateMedicineDto)
    @ApiProperty({
        type: [CreateMedicineDto],
        required: true,
        example: [
            {
                name: 'Paracetamol',
                genericName: 'Paracetamol',
                brand: 'Paracetamol',
                type: MedicineType.TABLET,
                category: 'Paracetamol',
                takeInstructions: [
                    {
                        time: '08:00',
                        quantity: 1,
                        unit: 'tablet',
                    },
                ],
                dosage: {
                    quantity: 1,
                    unit: 'tablet',
                },
                startDate: new Date(),
                endDate: new Date(),
                expiryDate: new Date(),
                storageConditions: [StorageCondition.ROOM_TEMP],
                storageNotes: 'Paracetamol',
                package: {
                    name: 'Paracetamol',
                    quantity: 1,
                    unit: 'tablet',
                },
                hospital: {
                    name: 'Paracetamol',
                    quantity: 1,
                    unit: 'tablet',
                },
                sideEffects: [
                    {
                        description: 'Drowsiness',
                        severity: EffectServeriry.MILD,
                        probability: EffectProbability.COMMON,
                        action: 'Do not drive',
                    },
                ],
                warnings: [
                    {
                        description: 'Drowsiness',
                        severity: EffectServeriry.MILD,
                        probability: EffectProbability.COMMON,
                        action: 'Do not drive',
                    },
                ],
                createdBy: 'Paracetamol',
                updatedBy: 'Paracetamol',
                isActive: true,
                isCompleted: true,
            },
        ],
        description: 'List of medicines',
    })
    values: CreateMedicineDto[];
}
