//- Path: "TeaChoco-Hospital/server/src/api/medicine/dto/create-medicine.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ResponseDoctorDto extends CreateDoctorDto {
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
