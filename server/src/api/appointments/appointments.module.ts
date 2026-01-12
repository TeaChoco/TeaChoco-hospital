// -Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { DoctorsModule } from '../doctors/doctors.module';
import { AppointmentsService } from './appointments.service';
import { HospitalsModule } from '../hospitals/hospitals.module';
import { AppointmentsController } from './appointments.controller';
import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
import { Hospital, HospitalSchema } from '../hospitals/schemas/hospital.schema';

@Module({
    imports: [
        DoctorsModule,
        HospitalsModule,
        ...new ImportsMongoose({ name: Doctor.name, schema: DoctorSchema }).imports,
        ...new ImportsMongoose({ name: Hospital.name, schema: HospitalSchema }).imports,
        ...new ImportsMongoose({ name: Appointment.name, schema: AppointmentSchema }).imports,
    ],
    providers: [ApiService, AppointmentsService],
    controllers: [AppointmentsController],
    exports: [AppointmentsService],
})
export class AppointmentsModule {}
