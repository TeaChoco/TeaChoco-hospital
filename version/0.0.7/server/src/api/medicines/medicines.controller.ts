//-Path: "TeaChoco-Hospital/server/src/api/medicines/medicines.controller.ts"
import type { Request } from 'express';
import { Auth } from '../../types/auth';
import { MedicinesService } from './medicines.service';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicineResponseDto } from './dto/response-medicine.dto';
import { UserAuthGuard } from '../../user/auth/guard/user-auth.guard';
import { CreateMedicineDto, CreateMedicineManyDto } from './dto/create-medicine.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@ApiTags('Api Medicines')
@Controller('api/medicines')
export class MedicinesController {
    constructor(private readonly medicinesService: MedicinesService) {}

    @Get()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: [MedicineResponseDto],
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: [MedicineResponseDto],
        description: 'Not Found',
    })
    async findAll(@Req() req: Request) {
        const user = req.user as Auth;
        return this.medicinesService.findAll(user);
    }

    @Get(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: MedicineResponseDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: MedicineResponseDto,
        description: 'Not Found',
    })
    async findOne(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.medicinesService.findOne(user, id);
    }

    @Post()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: MedicineResponseDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: MedicineResponseDto,
        description: 'Not Found',
    })
    async create(@Req() req: Request, @Body() data: CreateMedicineDto) {
        const user = req.user as Auth;
        return this.medicinesService.create(user, data);
    }

    @Post('many')
    @UseGuards(UserAuthGuard)
    @ApiBody({
        type: CreateMedicineManyDto,
        required: true,
        description: 'List of medicines',
    })
    @ApiResponse({
        status: 201,
        type: MedicineResponseDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: MedicineResponseDto,
        description: 'Not Found',
    })
    async createMany(@Req() req: Request, @Body() data: CreateMedicineDto[]) {
        const user = req.user as Auth;
        return this.medicinesService.createMany(user, data);
    }

    @Put(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: MedicineResponseDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: MedicineResponseDto,
        description: 'Not Found',
    })
    async update(@Req() req: Request, @Param('id') id: string, @Body() data: UpdateMedicineDto) {
        const user = req.user as Auth;
        return await this.medicinesService.update(user, id, data);
    }

    @Delete(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: MedicineResponseDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: MedicineResponseDto,
        description: 'Not Found',
    })
    async remove(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.medicinesService.remove(user, id);
    }
}
