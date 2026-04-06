//- Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { Logger } from '@nestjs/common';
import { ApiService } from '../api.service';
import { Injectable } from '@nestjs/common';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital, HospitalDocument } from './schemas/hospital.schema';
import { ResponseHospitalDto } from './dto/response-hospital.dto';
import { ApiOutMetaSchema } from 'src/types/dto';

@Injectable()
export class HospitalsService {
    logger = new Logger(HospitalsService.name);

    constructor(
        private readonly apiService: ApiService<
            Hospital,
            HospitalDocument,
            CreateHospitalDto,
            ResponseHospitalDto,
            UpdateHospitalDto
        >,
        @InjectModel(Hospital.name, nameDB)
        private readonly hospitalModel: Model<Hospital>,
    ) {}

    getNewData(data: CreateHospitalDto): ApiOutMetaSchema<Hospital> {
        return {
            name: data.name,
            address: data.address,
            contactNumber: data.contactNumber,
            website: data.website,
        };
    }

    async findAll(auth: Auth) {
        const hospitals = await this.hospitalModel.find();
        return this.apiService.findAll(auth, hospitals);
    }

    async findOne(auth: Auth, id: string): Promise<ResponseHospitalDto | null> {
        const hospital = await this.hospitalModel.findById(id);
        if (hospital && auth?.allows.some((allows) => allows.hospitals?.read))
            return this.apiService.response(hospital.toObject());
        return this.apiService.findOne(auth, hospital);
    }

    async response(hospital: Hospital): Promise<ResponseHospitalDto> {
        return this.apiService.response(hospital);
    }

    async create(auth: Auth, data: CreateHospitalDto) {
        const newData = await this.apiService.create(auth, data, this.getNewData);
        const hospital = new this.hospitalModel(newData);
        return await hospital.save();
    }

    async update(auth: Auth, id: string, data: UpdateHospitalDto) {
        const hospital = await this.findOne(auth, id);
        const newData = await this.apiService.update(auth, hospital, data, this.getNewData);
        return await this.hospitalModel.findByIdAndUpdate(id, newData, { new: true });
    }

    async remove(auth: Auth, id: string) {
        const hospital = await this.hospitalModel.findById(id);
        await this.apiService.remove(auth, hospital);
        return await this.hospitalModel.findByIdAndDelete(id);
    }
}
