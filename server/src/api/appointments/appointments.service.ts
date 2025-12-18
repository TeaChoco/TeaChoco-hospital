//- Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.service.ts"
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { nameDB } from '../../hooks/mongodb';
import { Auth } from '../../user/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name, nameDB)
        private readonly appointmentModel: Model<Appointment>,
    ) {}

    async findAll(auth: Auth) {
        const appointments = await this.appointmentModel.find();
        return appointments.filter((appointment) => appointment.user_id === auth?.user_id);
    }

    async findOne(auth: Auth, id: string) {
        return await this.appointmentModel.findById(id);
    }

    async create(auth: Auth, data: CreateAppointmentDto) {
        const appointment = new this.appointmentModel(data);
        return await appointment.save();
    }

    async update(auth: Auth, id: string, data: UpdateAppointmentDto) {
        return await this.appointmentModel.findByIdAndUpdate(id, data, { new: true });
    }
}
