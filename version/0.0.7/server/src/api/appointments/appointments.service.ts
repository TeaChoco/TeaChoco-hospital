//-Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { ApiService } from '../api.service';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { DoctorsService } from '../doctors/doctors.service';
import { Hospital } from '../hospitals/schemas/hospital.schema';
import { HospitalsService } from '../hospitals/hospitals.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ResponseAppointmentDto } from './dto/response-appointment.dto';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
    logger = new Logger(AppointmentsService.name);

    constructor(
        private readonly apiService: ApiService<
            Appointment,
            AppointmentDocument,
            CreateAppointmentDto,
            ResponseAppointmentDto,
            UpdateAppointmentDto
        >,
        private readonly doctorService: DoctorsService,
        private readonly hospitalService: HospitalsService,
        @InjectModel(Doctor.name, nameDB)
        private readonly doctorModel: Model<Doctor>,
        @InjectModel(Hospital.name, nameDB)
        private readonly hospitalModel: Model<Hospital>,
        @InjectModel(Appointment.name, nameDB)
        private readonly appointmentModel: Model<Appointment>,
    ) {
        apiService.response = async (data) => {
            const response = data as unknown as ResponseAppointmentDto;
            if (response.hospitalId) {
                const hospital = await this.hospitalModel.findById(response.hospitalId);
                if (hospital)
                    response.hospital = await this.hospitalService.response(hospital.toObject());
            }
            if (response.doctor_id) {
                const doctor = await this.doctorModel.findById(response.doctor_id);
                if (doctor) response.doctor = await this.doctorService.response(doctor.toObject());
            }
            return response;
        };
    }

    async findAll(auth: Auth) {
        const appointments = await this.appointmentModel.find();
        return this.apiService.findAll(auth, appointments);
    }

    async findOne(auth: Auth, id: string): Promise<ResponseAppointmentDto | null> {
        const appointment = await this.appointmentModel.findById(id);
        if (appointment && auth?.allows.some((allows) => allows.appointments?.read))
            return this.apiService.response(appointment.toObject());
        return this.apiService.findOne(auth, appointment);
    }

    async response(appointment: Appointment): Promise<ResponseAppointmentDto> {
        return this.apiService.response(appointment);
    }

    async create(auth: Auth, data: CreateAppointmentDto) {
        const newData = await this.apiService.create(auth, data, (data) => ({
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
        const appointment = new this.appointmentModel(newData);
        return await appointment.save();
    }

    async update(auth: Auth, id: string, data: UpdateAppointmentDto) {
        const appointment = await this.findOne(auth, id);
        const newData = await this.apiService.update(auth, appointment, data, (data) => ({
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
