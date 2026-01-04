import { Module } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';

@Module({
    imports: [
        ...new ImportsMongoose({ name: Appointment.name, schema: AppointmentSchema }).imports,
    ],
    providers: [ApiService, AppointmentsService],
    controllers: [AppointmentsController],
})
export class AppointmentsModule {}
