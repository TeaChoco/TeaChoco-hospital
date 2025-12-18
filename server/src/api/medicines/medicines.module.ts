//- Path: "TeaChoco-Hospital/server/src/api/medicine/medicine.module.ts"
import { Module } from '@nestjs/common';
import { ImportsMongoose } from 'src/hooks/mongodb';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { Medicine, MedicineSchema } from './schemas/medicine.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Medicine.name, schema: MedicineSchema }).imports],
    providers: [MedicinesService],
    controllers: [MedicinesController],
})
export class MedicinesModule {}
