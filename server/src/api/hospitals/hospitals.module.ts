//-Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.module.ts"
import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { HospitalsController } from './hospitals.controller';
import { Hospital, HospitalSchema } from './schemas/hospital.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Hospital.name, schema: HospitalSchema }).imports],
    providers: [HospitalsService],
    controllers: [HospitalsController],
})
export class HospitalsModule {}
