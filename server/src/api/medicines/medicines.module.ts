//-Path: "TeaChoco-Hospital/server/src/api/medicines/medicines.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from '../api.service';
import { MedicinesService } from './medicines.service';
import { ImportsMongoose } from '../../hooks/mongodb';
import { MedicinesController } from './medicines.controller';
import { Medicine, MedicineSchema } from './schemas/medicine.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Medicine.name, schema: MedicineSchema }).imports],
    providers: [ApiService, MedicinesService],
    controllers: [MedicinesController],
    exports: [MedicinesService],
})
export class MedicinesModule {}
