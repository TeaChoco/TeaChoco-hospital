//-Path: "TeaChoco-Hospital/server/src/api/doctors/doctors.module.ts"
import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { DoctorsController } from './doctors.controller';
import { Doctor, DoctorSchema } from './schemas/doctor.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Doctor.name, schema: DoctorSchema }).imports],
    providers: [DoctorsService],
    controllers: [DoctorsController],
})
export class DoctorsModule {}
