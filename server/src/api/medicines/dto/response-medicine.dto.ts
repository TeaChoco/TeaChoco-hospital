//- Path: "TeaChoco-Hospital/server/src/api/medicine/dto/create-medicine.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class ResponseMedicineDto extends CreateMedicineDto {}

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
