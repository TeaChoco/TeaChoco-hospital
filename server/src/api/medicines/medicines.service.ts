//-Path: "TeaChoco-Hospital/server/src/api/medicines/medicines.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { ApiService } from '../api.service';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ResponseMedicineDto } from './dto/response-medicine.dto';
import { Medicine, MedicineDocument } from './schemas/medicine.schema';

@Injectable()
export class MedicinesService {
    logger = new Logger(MedicinesService.name);

    constructor(
        private readonly apiService: ApiService<
            Medicine,
            MedicineDocument,
            CreateMedicineDto,
            ResponseMedicineDto,
            UpdateMedicineDto
        >,
        @InjectModel(Medicine.name, nameDB)
        private readonly medicineModel: Model<Medicine>,
    ) {}

    async findAll(auth: Auth) {
        const medicines = await this.medicineModel.find();
        return this.apiService.findAll(auth, medicines);
    }

    async findOne(auth: Auth, id: string): Promise<ResponseMedicineDto | null> {
        const medicine = await this.medicineModel.findById(id);
        if (medicine && auth?.allows.some((allows) => allows.medicines?.read))
            return this.apiService.response(medicine);
        return this.apiService.findOne(auth, medicine);
    }

    async create(auth: Auth, data: CreateMedicineDto) {
        const newData = await this.apiService.create(auth, data, (data) => ({
            name: data.name,
            genericName: data.genericName,
            brand: data.brand,
            type: data.type,
            category: data.category,
            takeInstructions: data.takeInstructions,
            dosage: data.dosage,
            startDate: data.startDate,
            endDate: data.endDate,
            expiryDate: data.expiryDate,
            storageConditions: data.storageConditions,
            storageNotes: data.storageNotes,
            package: data.package,
            hospital: data.hospital,
            sideEffects: data.sideEffects,
            warnings: data.warnings,
            imageUrl: data.imageUrl,
            qrCode: data.qrCode,
            barcode: data.barcode,
            isActive: data.isActive,
            isCompleted: data.isCompleted,
        }));
        const medicine = new this.medicineModel(newData);
        return await medicine.save();
    }

    async createMany(auth: Auth, data: CreateMedicineDto[]) {
        const newData = await this.apiService.createMany(auth, data, (data) => ({
            name: data.name,
            genericName: data.genericName,
            brand: data.brand,
            type: data.type,
            category: data.category,
            takeInstructions: data.takeInstructions,
            dosage: data.dosage,
            startDate: data.startDate,
            endDate: data.endDate,
            expiryDate: data.expiryDate,
            storageConditions: data.storageConditions,
            storageNotes: data.storageNotes,
            package: data.package,
            hospital: data.hospital,
            sideEffects: data.sideEffects,
            warnings: data.warnings,
            imageUrl: data.imageUrl,
            qrCode: data.qrCode,
            barcode: data.barcode,
            isActive: data.isActive,
            isCompleted: data.isCompleted,
        }));
        return await this.medicineModel.insertMany(newData);
    }

    async update(auth: Auth, id: string, data: UpdateMedicineDto) {
        const medicine = await this.findOne(auth, id);
        const newData = await this.apiService.update(auth, medicine, data, (data) => ({
            name: data.name,
            genericName: data.genericName,
            brand: data.brand,
            type: data.type,
            category: data.category,
            takeInstructions: data.takeInstructions,
            dosage: data.dosage,
            startDate: data.startDate,
            endDate: data.endDate,
            expiryDate: data.expiryDate,
            storageConditions: data.storageConditions,
            storageNotes: data.storageNotes,
            package: data.package,
            hospital: data.hospital,
            sideEffects: data.sideEffects,
            warnings: data.warnings,
            imageUrl: data.imageUrl,
            qrCode: data.qrCode,
            barcode: data.barcode,
            isActive: data.isActive,
            isCompleted: data.isCompleted,
        }));
        return await this.medicineModel.findByIdAndUpdate(id, newData, { new: true });
    }

    async remove(auth: Auth, id: string) {
        const medicine = await this.medicineModel.findById(id);
        await this.apiService.remove(auth, medicine);
        return await this.medicineModel.findByIdAndDelete(id);
    }
}
