// -Path: "TeaChoco-Hospital/server/src/api/img/img.module.ts"
import { Module } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { ImportsMongoose } from '../../hooks/mongodb';
import { Image, ImageSchema } from './schemas/image.schema';

@Module({
    imports: [...new ImportsMongoose({ name: Image.name, schema: ImageSchema }).imports],
    controllers: [ImgController],
    providers: [ApiService, ImgService],
})
export class ImgModule {}
