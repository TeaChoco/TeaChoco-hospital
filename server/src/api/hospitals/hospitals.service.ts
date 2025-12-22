//- Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.service.ts"
import { Model } from 'mongoose';
import { nameDB } from '../../hooks/mongodb';
import { Auth } from '../../user/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from './schemas/hospital.schema';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectModel(Hospital.name, nameDB)
        private readonly hospitalModel: Model<Hospital>,
    ) {}

    async findAll(auth: Auth) {
        const hospitals = await this.hospitalModel.find();
        return hospitals.filter((hospital) => hospital.user_id === auth?.user_id);
    }

    async findOne(auth: Auth, id: string) {
        const hospital = await this.hospitalModel.findById(id);
        if (hospital?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        return hospital;
    }

    async create(auth: Auth, data: CreateHospitalDto) {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        const hospital = new this.hospitalModel(data);
        return await hospital.save();
    }

    async update(auth: Auth, id: string, data: Hospital) {
        const hospital = await this.findOne(auth, id);
        if (hospital?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        return await this.hospitalModel.findByIdAndUpdate(id, data, { new: true });
    }
}
