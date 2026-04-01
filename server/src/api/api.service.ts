//- Path: "TeaChoco-Hospital/server/src/api/api.service.ts"
import {
    Scope,
    Logger,
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { Document } from 'mongoose';
import { Auth } from '../types/auth';
import { ApiMetaDto, ApiMetaSchema, ApiOutMetaSchema } from '../types/dto';

@Injectable({ scope: Scope.TRANSIENT })
export class ApiService<
    DataSchema extends ApiMetaSchema,
    DataDocument extends DataSchema & Document,
    DataCreate extends ApiMetaDto,
    DataResponse extends DataCreate,
    DataUpdate extends Partial<ApiMetaDto>,
> {
    private readonly logger = new Logger(ApiService.name);
    public response: (data: DataSchema) => Promise<DataResponse> = async (data) =>
        ({ ...data }) as unknown as DataResponse;
    constructor() {}

    async findAll(auth: Auth, datas: DataDocument[]): Promise<DataResponse[]> {
        const results = datas.filter((data) => data.user_id === auth?.user_id);
        return Promise.all(results.map((data) => this.response(data.toObject())));
    }

    async findOne(auth: Auth, data: DataDocument | null): Promise<DataResponse | null> {
        if (data?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        if (data) return this.response(data.toObject());
        return null;
    }

    async create(
        auth: Auth,
        data: DataCreate,
        getNewData: (data: DataCreate) => ApiOutMetaSchema<DataSchema>,
    ): Promise<DataResponse> {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (
            (data.user_id && auth.user_id !== data.user_id) ||
            (data.createdBy && auth.user_id !== data.createdBy) ||
            (data.updatedBy && auth.user_id !== data.updatedBy)
        )
            throw new BadRequestException('Unauthorized');
        const newData = getNewData(data);
        const result = {
            user_id: auth.user_id,
            createdBy: auth.user_id,
            updatedBy: auth.user_id,
            ...newData,
        } as DataSchema;
        return this.response(result);
    }

    async createMany(
        auth: Auth,
        datas: DataCreate[],
        getNewData: (data: DataCreate) => ApiOutMetaSchema<DataSchema>,
    ): Promise<DataResponse[]> {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (
            datas.find(
                (data) =>
                    (data.user_id && data.user_id !== auth.user_id) ||
                    (data.createdBy && data.createdBy !== auth.user_id) ||
                    (data.updatedBy && data.updatedBy !== auth.user_id),
            )
        )
            throw new BadRequestException('Unauthorized');
        const newData = datas.map((data) => getNewData(data));
        const results = newData.map((data) => ({
            user_id: auth.user_id,
            createdBy: auth.user_id,
            updatedBy: auth.user_id,
            ...data,
        })) as DataSchema[];
        return Promise.all(results.map((data) => this.response(data)));
    }

    async update(
        auth: Auth,
        data: DataResponse | null,
        update: DataUpdate,
        getNewData: (data: DataUpdate) => Partial<ApiOutMetaSchema<DataSchema>>,
    ): Promise<DataResponse> {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        this.logger.log({
            user_id: auth.user_id,
            data,
            update,
        });
        if (auth.user_id !== data?.user_id) throw new BadRequestException('User ID is not match');
        if (auth.user_id !== update.createdBy)
            throw new BadRequestException('Created By is not match');
        if (auth.user_id !== update.updatedBy)
            throw new BadRequestException('Updated By is not match');
        const newData = getNewData(update);
        const updatedData = {
            updatedBy: auth.user_id,
            ...newData,
        } as DataSchema;
        return this.response(updatedData);
    }

    async remove(auth: Auth, data: DataDocument | null): Promise<DataResponse> {
        if (auth === null) throw new UnauthorizedException('Unauthorized');
        if (data?.user_id !== auth?.user_id) throw new BadRequestException('Unauthorized');
        return this.response(data);
    }
}
