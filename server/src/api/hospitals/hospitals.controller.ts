//-Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.controller.ts"
import {
    Get,
    Req,
    Put,
    Post,
    Body,
    Param,
    Logger,
    Delete,
    UseGuards,
    Controller,
} from '@nestjs/common';
import type { Request } from 'express';
import { Auth } from '../../types/auth';
import { HospitalsService } from './hospitals.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ResponseHospitalDto } from './dto/response-hospital.dto';
import { UserAuthGuard } from '../../user/auth/guard/user-auth.guard';

@ApiTags('Api Hospitals')
@Controller('api/hospitals')
export class HospitalsController {
    logger = new Logger(HospitalsController.name);

    constructor(private readonly hospitalsService: HospitalsService) {}

    @Get()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: [ResponseHospitalDto],
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: [ResponseHospitalDto],
        description: 'Not Found',
    })
    async findAll(@Req() req: Request) {
        const user = req.user as Auth;
        return this.hospitalsService.findAll(user);
    }

    @Get(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: ResponseHospitalDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseHospitalDto,
        description: 'Not Found',
    })
    async findOne(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.hospitalsService.findOne(user, id);
    }

    @Post()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseHospitalDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseHospitalDto,
        description: 'Not Found',
    })
    async create(@Req() req: Request, @Body() data: CreateHospitalDto) {
        const user = req.user as Auth;
        const result = await this.hospitalsService.create(user, data);
        return { user, data, result };
    }

    @Put(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseHospitalDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseHospitalDto,
        description: 'Not Found',
    })
    async update(@Req() req: Request, @Param('id') id: string, @Body() data: UpdateHospitalDto) {
        const user = req.user as Auth;
        this.logger.log(`User ${user?.user_id} is updating a hospital`);
        const result = await this.hospitalsService.update(user, id, data);
        this.logger.log(`Result: ${JSON.stringify(result)}`);
        return { user, data, result };
    }

    @Delete(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: ResponseHospitalDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseHospitalDto,
        description: 'Not Found',
    })
    async remove(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.hospitalsService.remove(user, id);
    }
}
