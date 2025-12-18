//- Path: "TeaChoco-Hospital/server/src/api/appointments/dto/create-appointment.dto.ts"
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @IsString()
    @ApiProperty({
        type: String,
        example: '123456789',
        description: 'User ID',
    })
    user_id: string;
}
