//-Path: "TeaChoco-Hospital/server/src/api/doctors/doctors.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { ApiService } from '../api.service';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorsService {
    logger = new Logger(DoctorsService.name);

    constructor(
        private readonly apiService: ApiService<
            Doctor,
            DoctorDocument,
            CreateDoctorDto,
            ResponseDoctorDto,
            UpdateDoctorDto
        >,
        @InjectModel(Doctor.name, nameDB)
        private readonly doctorModel: Model<Doctor>,
    ) {}

    async findAll(auth: Auth) {
        const doctors = await this.doctorModel.find();
        return this.apiService.findAll(auth, doctors);
    }

    async findOne(auth: Auth, id: string) {
        const doctor = await this.doctorModel.findById(id);
        if (doctor && auth?.allows.some((allows) => allows.doctors?.read))
            return this.apiService.response(doctor.toObject());
        return this.apiService.findOne(auth, doctor);
    }

    async response(doctor: Doctor): Promise<ResponseDoctorDto> {
        return this.apiService.response(doctor);
    }

    async create(auth: Auth, data: CreateDoctorDto) {
        const newData = await this.apiService.create(auth, data, (data) => ({
            firstName: data.firstName,
            lastName: data.lastName,
            nickname: data.nickname,
            hospitalId: data.hospitalId,
            department: data.department,
            contactNumber: data.contactNumber,
            picture: data.picture,
        }));

        const doctor = new this.doctorModel(newData);
        return await doctor.save();
    }

    async update(auth: Auth, id: string, data: UpdateDoctorDto) {
        const doctor = await this.findOne(auth, id);
        const newData = await this.apiService.update(auth, doctor, data, (data) => ({
            firstName: data.firstName,
            lastName: data.lastName,
            nickname: data.nickname,
            hospitalId: data.hospitalId,
            department: data.department,
            contactNumber: data.contactNumber,
            picture: data.picture,
        }));
        return await this.doctorModel.findByIdAndUpdate(id, newData, { new: true });
    }

    async remove(auth: Auth, id: string) {
        const doctor = await this.doctorModel.findById(id);
        await this.apiService.remove(auth, doctor);
        return await this.doctorModel.findByIdAndDelete(id);
    }
}
