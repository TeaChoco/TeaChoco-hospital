//-Path: "TeaChoco-Hospital/server/src/api/hospitals/dto/create-hospital.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateHospitalDto {
    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: '123456789',
        description: 'User ID',
    })
    user_id: string;

    @IsString()
    @ApiProperty({
        type: String,
        required: true,
        example: 'Hospital Name',
        description: 'Hospital name',
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: '123 Main St, Hospital City',
        description: 'Hospital address',
    })
    address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: '+66987654321',
        description: 'Hospital contact number',
    })
    contactNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        example: 'https://hospital.com',
        description: 'Hospital website',
    })
    website?: string;
}
