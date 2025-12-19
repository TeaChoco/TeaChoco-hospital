//- Path: "TeaChoco-Hospital/server/src/api/api.module.ts"
import { Module } from '@nestjs/common';
// import { SocketModule } from './socket/socket.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicinesModule } from './medicines/medicines.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
    imports: [
        // HospitalsModule,
        // DoctorsModule,
        // AppointmentsModule,
        // MedicinesModule,
        // SocketModule
    ],
})
export class ApiModule {}
