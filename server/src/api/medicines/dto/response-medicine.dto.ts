//- Path: "TeaChoco-Hospital/server/src/api/medicine/dto/create-medicine.dto.ts"
import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { CreateMedicineDto } from './create-medicine.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseMedicineDto extends CreateMedicineDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'ID',
    })
    _id: string;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Created at',
    })
    createdAt: Date;

    @IsDate()
    @ApiProperty({
        type: Date,
        required: true,
        example: '2022-01-01',
        description: 'Updated at',
    })
    updatedAt: Date;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: 'Version',
    })
    __v: number;
}

export class MedicineResponseDto {
    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: 'Success',
    })
    success: boolean;

    @IsArray()
    @ApiProperty({
        type: [ResponseMedicineDto],
        required: false,
        example: [{}],
        description: 'Data',
    })
    data: ResponseMedicineDto[];

    @IsString()
    @ApiProperty({
        type: String,
        required: false,
        example: 'message',
        description: 'Message',
    })
    message?: string;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Total',
    })
    total?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Page',
    })
    page?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
        description: 'Limit',
    })
    limit?: number;
}
