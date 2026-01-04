//- Path: "TeaChoco-Hospital/server/src/api/api.service.ts"
import { Document } from 'mongoose';
import { Auth } from '../types/auth';
import { ApiMetaDto, ApiMetaSchema, ApiOutMetaSchema } from '../types/dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiService {
    constructor() {}

    async findAll<Data extends ApiMetaSchema & Document>(auth: Auth, datas: Data[]) {
        return datas.filter((data) => data.user_id === auth?.user_id);
    }

    async findOne<Data extends ApiMetaSchema & Document>(auth: Auth, data: Data | null) {
        if (data?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        return data;
    }

    async create<DataDocument, Data extends ApiMetaDto>(
        auth: Auth,
        data: Data,
        getNewData: (data: Data) => ApiOutMetaSchema<DataDocument>,
    ) {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (
            auth.user_id !== data.user_id ||
            auth.user_id !== data.createdBy ||
            auth.user_id !== data.updatedBy
        )
            throw new BadRequestException('Unauthorized');
        const newData = getNewData(data);
        return {
            user_id: auth.user_id,
            createdBy: auth.user_id,
            updatedBy: auth.user_id,
            ...newData,
        };
    }

    async createMany<DataDocument, Data extends ApiMetaDto>(
        auth: Auth,
        datas: Data[],
        getNewData: (data: Data) => ApiOutMetaSchema<DataDocument>,
    ) {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (
            datas.find(
                (data) =>
                    data.user_id !== auth.user_id ||
                    data.createdBy !== auth.user_id ||
                    data.updatedBy !== auth.user_id,
            )
        )
            throw new BadRequestException('Unauthorized');
        const newData = datas.map((data) => getNewData(data));
        return newData.map((data) => ({
            user_id: auth.user_id,
            createdBy: auth.user_id,
            updatedBy: auth.user_id,
            ...data,
        }));
    }

    async update<
        DataDocument,
        Data extends ApiMetaSchema & Document,
        Update extends Partial<ApiMetaDto>,
    >(
        auth: Auth,
        data: Data | null,
        update: Update,
        getNewData: (data: Update) => Partial<ApiOutMetaSchema<DataDocument>>,
    ) {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (
            auth.user_id !== data?.user_id ||
            auth.user_id !== update.user_id ||
            auth.user_id !== update.updatedBy
        )
            throw new BadRequestException('Unauthorized');
        const newData = getNewData(update);
        return {
            updatedBy: auth.user_id,
            ...newData,
        };
    }

    async remove<Data extends ApiMetaSchema & Document>(auth: Auth, data: Data | null) {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (data?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        return data;
    }
}
