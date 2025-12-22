//-Path: "TeaChoco-Hospital/server/src/api/medicines/medicines.service.ts"
import { Model } from 'mongoose';
import { nameDB } from '$/hooks/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Allow, Auth } from '$/user/dto/user.dto';
import { Medicine } from './schemas/medicine.schema';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService {
    constructor(
        @InjectModel(Medicine.name, nameDB)
        private readonly medicineModel: Model<Medicine>,
    ) {}

    async findAll(auth: Auth) {
        const medicines = await this.medicineModel.find();
        return medicines.filter((medicine) => medicine.user_id === auth?.user_id);
    }

    async findOne(auth: Auth, id: string) {
        const medicine = await this.medicineModel.findById(id);
        if (
            medicine?.user_id === auth?.user_id ||
            auth?.allows.some((allows) => allows.edit.some((allow) => allow === Allow.MEDICINES))
        )
            return medicine;
    }

    async create(auth: Auth, data: CreateMedicineDto) {
        const medicine = new this.medicineModel(data);
        return await medicine.save();
    }

    async createMany(auth: Auth, data: CreateMedicineDto[]) {
        const medicines = data.map((medicine) => new this.medicineModel(medicine));
        return await this.medicineModel.insertMany(medicines);
    }

    async update(auth: Auth, id: string, data: UpdateMedicineDto) {
        return await this.medicineModel.findByIdAndUpdate(id, data, { new: true });
    }
}
