//-Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospital, HospitalSchema } from './schemas/hospital.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Hospital.name, schema: HospitalSchema }).imports],
    providers: [ApiService, HospitalsService],
    controllers: [HospitalsController],
})
export class HospitalsModule {}
