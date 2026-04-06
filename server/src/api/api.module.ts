//- Path: "TeaChoco-Hospital/server/src/api/api.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ImgModule } from './img/img.module';
import { SocketModule } from './socket/socket.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicinesModule } from './medicines/medicines.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
    exports: [ApiService],
    providers: [ApiService],
    imports: [
        ImgModule,
        SocketModule,
        DoctorsModule,
        MedicinesModule,
        HospitalsModule,
        AppointmentsModule,
    ],
})
export class ApiModule {}
