//- Path: "TeaChoco-Hospital/server/src/api/doctors/doctors.service.ts"
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { nameDB } from '../../hooks/mongodb';
import { Auth } from '../../user/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './schemas/doctor.schema';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(Doctor.name, nameDB)
        private readonly doctorModel: Model<Doctor>,
    ) {}

    async findAll(auth: Auth) {
        const doctors = await this.doctorModel.find();
        return doctors.filter((doctor) => doctor.user_id === auth?.user_id);
    }

    async findOne(auth: Auth, id: string) {
        return await this.doctorModel.findById(id);
    }

    async create(auth: Auth, data: Doctor) {
        const doctor = new this.doctorModel(data);
        return await doctor.save();
    }

    async update(auth: Auth, id: string, data: Doctor) {
        return await this.doctorModel.findByIdAndUpdate(id, data, { new: true });
    }
}
