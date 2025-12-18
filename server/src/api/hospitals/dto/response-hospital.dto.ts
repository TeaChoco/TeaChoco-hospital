//-Path: "TeaChoco-Hospital/server/src/api/hospitals/dto/create-hospital.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { CreateHospitalDto } from './create-hospital.dto';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class ResponseHospitalDto extends CreateHospitalDto {
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
