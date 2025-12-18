//- Path: "TeaChoco-Hospital/server/src/api/doctors/dto/create-doctor.dto.ts"
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
    @IsString()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'User ID',
    })
    user_id: string;

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
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'Contact number',
    })
    contactNumber?: string;

    @IsString()
    @ApiProperty({
        type: String,
        example: 'https://example.com/picture.jpg',
        description: 'Picture',
    })
    picture?: string;
}
