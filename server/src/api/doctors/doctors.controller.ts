//-Path: "TeaChoco-Hospital/server/src/api/doctors/doctors.controller.ts"
import type { Request } from 'express';
import { Auth } from '$/user/dto/user.dto';
import { DoctorsService } from './doctors.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { UserAuthGuard } from '$/user/auth/guard/user-auth.guard';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@ApiTags('Api Doctors')
@Controller('api/doctors')
export class DoctorsController {
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
    async create(@Req() req: Request, @Body() body: CreateDoctorDto) {
        const user = req.user as Auth;
        return this.doctorsService.create(user, body);
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
}
