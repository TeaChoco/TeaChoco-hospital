//- Path: "TeaChoco-Hospital/server/src/api/medicine/medicine.service.ts"
import { Model } from 'mongoose';
import { nameDB } from 'src/hooks/mongodb';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/user/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
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
        return await this.medicineModel.findById(id);
    }

    async create(auth: Auth, data: CreateMedicineDto) {
        const medicine = new this.medicineModel(data);
        return await medicine.save();
    }

    async update(auth: Auth, id: string, data: UpdateMedicineDto) {
        return await this.medicineModel.findByIdAndUpdate(id, data, { new: true });
    }
}
