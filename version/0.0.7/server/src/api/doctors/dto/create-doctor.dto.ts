//- Path: "TeaChoco-Hospital/server/src/api/doctors/dto/create-doctor.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { ApiMetaDto } from '../../../types/dto';
import { IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto extends ApiMetaDto {
    @IsString()
    @ApiProperty({
        type: String,
        example: 'John',
        description: 'First name',
    })
    firstName: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Doe',
        description: 'Last name',
    })
    lastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        example: 'John Doe',
        description: 'Nickname',
    })
    nickname?: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'Hospital ID',
    })
    hospitalId: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'Cardiology',
        description: 'Department',
    })
    department: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'Contact number',
    })
    contactNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        example: 'https://example.com/picture.jpg',
        description: 'Picture',
    })
    picture?: string;
}
