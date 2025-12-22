//-Path: "TeaChoco-Hospital/server/src/api/appointments/dto/response-appointment.dto.ts"
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { ResponseDoctorDto } from '../../doctors/dto/response-doctor.dto';
import { ResponseHospitalDto } from '../../hospitals/dto/response-hospital.dto';
import { ResponseMedicineDto } from '../../medicines/dto/response-medicine.dto';
import {
    IsDate,
    IsArray,
    IsNumber,
    IsString,
    IsObject,
    IsOptional,
    ValidateNested,
} from 'class-validator';

export class ResponseAppointmentDto extends CreateAppointmentDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '1234567890',
        description: 'ID',
    })
    _id: string;

    @IsObject()
    @IsOptional()
    @Type(() => ResponseHospitalDto)
    @ApiProperty({
        type: ResponseHospitalDto,
        required: false,
        example: {
            _id: '1234567890',
            name: 'Hospital',
            address: '123 Main St',
            phone: '123-456-7890',
            email: 'hospital@example.com',
            website: 'https://hospital.com',
            logo: 'https://hospital.com/logo.png',
            status: 'active',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-01',
            __v: 1,
        },
        description: 'Hospital',
    })
    hospital?: ResponseHospitalDto;

    @IsObject()
    @IsOptional()
    @Type(() => ResponseDoctorDto)
    @ApiProperty({
        type: ResponseDoctorDto,
        required: false,
        example: {
            _id: '1234567890',
            name: 'Doctor',
            address: '123 Main St',
            phone: '123-456-7890',
            email: 'hospital@example.com',
            website: 'https://hospital.com',
            logo: 'https://hospital.com/logo.png',
            status: 'active',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-01',
            __v: 1,
        },
        description: 'Doctor',
    })
    doctor?: ResponseDoctorDto;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ResponseMedicineDto)
    @ApiProperty({
        type: [ResponseMedicineDto],
        required: false,
        example: [
            {
                _id: '1234567890',
                name: 'Medicine',
                description: 'Description',
                price: 100,
                stock: 10,
                createdAt: '2022-01-01',
                updatedAt: '2022-01-01',
                __v: 1,
            },
        ],
        description: 'Medicines',
    })
    medicines?: ResponseMedicineDto[];

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
