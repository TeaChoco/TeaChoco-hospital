//-Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { ApiService } from '../api.service';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
    logger = new Logger(AppointmentsService.name);

    constructor(
        private readonly apiService: ApiService,
        @InjectModel(Appointment.name, nameDB)
        private readonly appointmentModel: Model<Appointment>,
    ) {}

    async findAll(auth: Auth) {
        const appointments = await this.appointmentModel.find();
        return this.apiService.findAll(auth, appointments);
    }

    async findOne(auth: Auth, id: string) {
        const appointment = await this.appointmentModel.findById(id);
        return this.apiService.findOne(auth, appointment);
    }

    async create(auth: Auth, data: CreateAppointmentDto) {
        const newData = await this.apiService.create<Appointment, CreateAppointmentDto>(
            auth,
            data,
            (data) => ({
                appointmentNumber: data.appointmentNumber,
                patientType: data.patientType,
                hospitalId: data.hospitalId,
                doctor_id: data.doctor_id,
                department: data.department,
                type: data.type,
                subType: data.subType,
                purpose: data.purpose,
                description: data.description,
                scheduledDate: data.scheduledDate,
                scheduledTime: data.scheduledTime,
                expectedDuration: data.expectedDuration,
                actualStartTime: data.actualStartTime,
                actualEndTime: data.actualEndTime,
                checkInTime: data.checkInTime,
                checkOutTime: data.checkOutTime,
                location: data.location,
                roomNumber: data.roomNumber,
                floor: data.floor,
                status: data.status,
                statusHistory: data.statusHistory,
                urgency: data.urgency,
                priority: data.priority,
                preparation: data.preparation,
                remindersSent: data.remindersSent,
                symptoms: data.symptoms,
                preliminaryDiagnosis: data.preliminaryDiagnosis,
                payment: data.payment,
                insurance: data.insurance,
                prescribedMedicines: data.prescribedMedicines,
                treatmentPlan: data.treatmentPlan,
                vitalSigns: data.vitalSigns,
                labResults: data.labResults,
                imagingResults: data.imagingResults,
                followUp: data.followUp,
                nextAppointmentId: data.nextAppointmentId,
                doctorNotes: data.doctorNotes,
                nurseNotes: data.nurseNotes,
                patientNotes: data.patientNotes,
                referralFrom: data.referralFrom,
                referralTo: data.referralTo,
                previousAppointmentId: data.previousAppointmentId,
                cancelledBy: data.cancelledBy,
                cancellationReason: data.cancellationReason,
                noShowReason: data.noShowReason,
                escorts: data.escorts,
            }),
        );
        const appointment = new this.appointmentModel(newData);
        return await appointment.save();
    }

    async update(auth: Auth, id: string, data: UpdateAppointmentDto) {
        const appointment = await this.appointmentModel.findById(id);
        const newData = await this.apiService.update<
            Appointment,
            AppointmentDocument,
            UpdateAppointmentDto
        >(auth, appointment, data, (data) => ({
            appointmentNumber: data.appointmentNumber,
            patientType: data.patientType,
            hospitalId: data.hospitalId,
            doctor_id: data.doctor_id,
            department: data.department,
            type: data.type,
            subType: data.subType,
            purpose: data.purpose,
            description: data.description,
            scheduledDate: data.scheduledDate,
            scheduledTime: data.scheduledTime,
            expectedDuration: data.expectedDuration,
            actualStartTime: data.actualStartTime,
            actualEndTime: data.actualEndTime,
            checkInTime: data.checkInTime,
            checkOutTime: data.checkOutTime,
            location: data.location,
            roomNumber: data.roomNumber,
            floor: data.floor,
            status: data.status,
            statusHistory: data.statusHistory,
            urgency: data.urgency,
            priority: data.priority,
            preparation: data.preparation,
            remindersSent: data.remindersSent,
            symptoms: data.symptoms,
            preliminaryDiagnosis: data.preliminaryDiagnosis,
            payment: data.payment,
            insurance: data.insurance,
            prescribedMedicines: data.prescribedMedicines,
            treatmentPlan: data.treatmentPlan,
            vitalSigns: data.vitalSigns,
            labResults: data.labResults,
            imagingResults: data.imagingResults,
            followUp: data.followUp,
            nextAppointmentId: data.nextAppointmentId,
            doctorNotes: data.doctorNotes,
            nurseNotes: data.nurseNotes,
            patientNotes: data.patientNotes,
            referralFrom: data.referralFrom,
            referralTo: data.referralTo,
            previousAppointmentId: data.previousAppointmentId,
            cancelledBy: data.cancelledBy,
            cancellationReason: data.cancellationReason,
            noShowReason: data.noShowReason,
            escorts: data.escorts,
        }));
        return await this.appointmentModel.findByIdAndUpdate(id, newData, { new: true });
    }

    async remove(auth: Auth, id: string) {
        const appointment = await this.appointmentModel.findById(id);
        await this.apiService.remove(auth, appointment);
        return await this.appointmentModel.findByIdAndDelete(id);
    }
}
