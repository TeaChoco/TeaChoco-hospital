//- Path: "TeaChoco-Hospital/server/src/api/medicine/dto/create-medicine.dto.ts"
import {
    WarningDto,
    SideEffectDto,
    PackageInfoDto,
    HospitalInfoDto,
    MedicineDosageDto,
    TakeInstructionDto,
} from './medicine.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MedicineType, StorageCondition } from '../../../types/medicine';
import { IsArray, IsBoolean, IsDate, IsEnum, IsObject, IsString } from 'class-validator';

export class CreateMedicineDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Paracetamol',
        description: 'Medicine name',
    })
    name: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Paracetamol',
        description: 'Generic name',
    })
    genericName: string;

    @IsString()
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
        example: 'Paracetamol',
        description: 'Medicine type',
    })
    type: MedicineType;

    @IsString()
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
        example: [{}],
        description: 'Take instructions',
    })
    takeInstructions: TakeInstructionDto[];

    @IsObject()
    @ApiProperty({
        type: MedicineDosageDto,
        required: true,
        example: {},
        description: 'Dosage',
    })
    dosage: MedicineDosageDto;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Start date',
    })
    startDate: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'End date',
    })
    endDate: Date;

    @IsDate()
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
        example: {},
        description: 'Package',
    })
    package: PackageInfoDto;

    @IsObject()
    @ApiProperty({
        type: HospitalInfoDto,
        required: true,
        example: {},
        description: 'Hospital',
    })
    hospital: HospitalInfoDto;

    @IsArray()
    @ApiProperty({
        type: [SideEffectDto],
        required: true,
        example: [{}],
        description: 'Side effects',
    })
    sideEffects: SideEffectDto[];

    @IsArray()
    @ApiProperty({
        type: [WarningDto],
        required: true,
        example: [{}],
        description: 'Warnings',
    })
    warnings: WarningDto[];

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Image URL',
    })
    imageUrl?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'QR code',
    })
    qrCode?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Barcode',
    })
    barcode?: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Paracetamol',
        description: 'Created by',
    })
    createdBy: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'Paracetamol',
        description: 'Updated by',
    })
    updatedBy?: string;

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
