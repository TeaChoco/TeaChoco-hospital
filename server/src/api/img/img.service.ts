//-Path: "TeaChoco-Hospital/server/src/api/img/img.service.ts"
import { Model } from 'mongoose';
import { Auth } from '../../types/auth';
import { ApiService } from '../api.service';
import { nameDB } from '../../hooks/mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import { Injectable, Logger } from '@nestjs/common';
import { ResponseImgDto } from './dto/response-img.dto';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImgService {
    logger = new Logger(ImgService.name);

    constructor(
        private readonly apiService: ApiService<
            Image,
            ImageDocument,
            CreateImgDto,
            ResponseImgDto,
            UpdateImgDto
        >,
        @InjectModel(Image.name, nameDB)
        private readonly imageModel: Model<Image>,
    ) {}

    async create(auth: Auth, file: Express.Multer.File) {
        const data: CreateImgDto = {
            data: file.buffer,
            name: file.originalname,
            mimetype: file.mimetype,
        } as CreateImgDto;
        const newData = await this.apiService.create(auth, data, (data) => ({
            data: data.data,
            name: data.name,
            mimetype: data.mimetype,
        }));
        const image = new this.imageModel(newData);
        return await image.save();
    }

    async findAll(auth: Auth): Promise<ResponseImgDto[]> {
        const images = await this.imageModel.find();
        return this.apiService.findAll(auth, images);
    }

    async findOne(auth: Auth, id: string): Promise<ResponseImgDto | null> {
        const image = await this.imageModel.findById(id);
        return this.apiService.findOne(auth, image);
    }

    async findOneRaw(id: string) {
        return await this.imageModel.findById(id);
    }

    async update(auth: Auth, id: string, data: UpdateImgDto, file?: Express.Multer.File) {
        const image = await this.imageModel.findById(id);
        const currentData = await this.apiService.findOne(auth, image);
        const updateData: UpdateImgDto = { ...data };
        if (file) {
            updateData.data = file.buffer;
            updateData.name = file.originalname;
            updateData.mimetype = file.mimetype;
        }
        const newData = await this.apiService.update(auth, currentData, updateData, (data) => ({
            data: data.data,
            name: data.name,
            mimetype: data.mimetype,
        }));
        return await this.imageModel.findByIdAndUpdate(id, newData, { new: true });
    }

    async remove(auth: Auth, id: string) {
        const image = await this.imageModel.findById(id);
        await this.apiService.remove(auth, image);
        return await this.imageModel.findByIdAndDelete(id);
    }
}
