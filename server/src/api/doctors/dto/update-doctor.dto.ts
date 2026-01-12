//- Path: "TeaChoco-Hospital/server/src/api/medicine/dto/update-medicine.dto.ts"
import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
