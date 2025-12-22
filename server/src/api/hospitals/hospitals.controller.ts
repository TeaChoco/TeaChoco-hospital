//-Path: "TeaChoco-Hospital/server/src/api/hospitals/hospitals.controller.ts"
import type { Request } from 'express';
import { Auth } from '$/user/dto/user.dto';
import { HospitalsService } from './hospitals.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UserAuthGuard } from '$/user/auth/guard/user-auth.guard';
import { ResponseHospitalDto } from './dto/response-hospital.dto';
import { Controller, Get, UseGuards, Req, Post, Body, Param, Put } from '@nestjs/common';

@ApiTags('Api Hospitals')
@Controller('api/hospitals')
export class HospitalsController {
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
    async update(@Req() req: Request, @Param('id') id: string, @Body() data: CreateHospitalDto) {
        const user = req.user as Auth;
        return this.hospitalsService.update(user, id, data);
    }
}
