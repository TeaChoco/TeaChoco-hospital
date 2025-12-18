//- Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.module.ts"
import { Module } from '@nestjs/common';
import { ImportsMongoose } from 'src/hooks/mongodb';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';

@Module({
    imports: [
        ...new ImportsMongoose({ name: Appointment.name, schema: AppointmentSchema }).imports,
    ],
    providers: [AppointmentsService],
    controllers: [AppointmentsController],
})
export class AppointmentsModule {}
