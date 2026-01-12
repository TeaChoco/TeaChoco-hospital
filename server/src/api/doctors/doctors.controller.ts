//-Path: "TeaChoco-Hospital/server/src/api/doctors/doctors.controller.ts"
import type { Request } from 'express';
import { Auth } from '../../types/auth';
import { Logger } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { UserAuthGuard } from '../../user/auth/guard/user-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@ApiTags('Api Doctors')
@Controller('api/doctors')
export class DoctorsController {
    logger = new Logger(DoctorsController.name);

    constructor(private readonly doctorsService: DoctorsService) {}

    @Get()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: [ResponseDoctorDto],
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: [ResponseDoctorDto],
        description: 'Not Found',
    })
    async findAll(@Req() req: Request) {
        const user = req.user as Auth;
        return this.doctorsService.findAll(user);
    }

    @Get(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: ResponseDoctorDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseDoctorDto,
        description: 'Not Found',
    })
    async findOne(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.doctorsService.findOne(user, id);
    }

    @Post()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseDoctorDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseDoctorDto,
        description: 'Not Found',
    })
    async create(@Req() req: Request, @Body() data: CreateDoctorDto) {
        const user = req.user as Auth;
        return this.doctorsService.create(user, data);
    }

    @Put(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseDoctorDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseDoctorDto,
        description: 'Not Found',
    })
    async update(@Req() req: Request, @Param('id') id: string, @Body() body: CreateDoctorDto) {
        const user = req.user as Auth;
        return this.doctorsService.update(user, id, body);
    }

    @Delete(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: ResponseDoctorDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseDoctorDto,
        description: 'Not Found',
    })
    async remove(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.doctorsService.remove(user, id);
    }
}
