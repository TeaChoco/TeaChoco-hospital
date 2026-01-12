//- Path: "TeaChoco-Hospital/server/src/api/api.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { SocketModule } from './socket/socket.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicinesModule } from './medicines/medicines.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ImgModule } from './img/img.module';

@Module({
    exports: [ApiService],
    providers: [ApiService],
    imports: [SocketModule, DoctorsModule, MedicinesModule, HospitalsModule, AppointmentsModule, ImgModule],
})
export class ApiModule {}
