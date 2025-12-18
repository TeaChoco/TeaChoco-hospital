//- Path: "TeaChoco-Hospital/server/src/api/appointments/appointments.controller.ts"
import type { Request } from 'express';
import { Auth } from 'src/user/dto/user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { UserAuthGuard } from 'src/user/auth/guard/user-auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ResponseAppointmentDto } from './dto/response-appointment.dto';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@ApiTags('Api Appointments')
@Controller('api/appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Get()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: [ResponseAppointmentDto],
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: [ResponseAppointmentDto],
        description: 'Not Found',
    })
    async findAll(@Req() req: Request) {
        const user = req.user as Auth;
        return this.appointmentsService.findAll(user);
    }

    @Get(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 200,
        type: ResponseAppointmentDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseAppointmentDto,
        description: 'Not Found',
    })
    async findOne(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.appointmentsService.findOne(user, id);
    }

    @Post()
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseAppointmentDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseAppointmentDto,
        description: 'Not Found',
    })
    async create(@Req() req: Request, @Body() data: CreateAppointmentDto) {
        const user = req.user as Auth;
        return this.appointmentsService.create(user, data);
    }

    @Put(':id')
    @UseGuards(UserAuthGuard)
    @ApiResponse({
        status: 201,
        type: ResponseAppointmentDto,
        description: 'Success',
    })
    @ApiResponse({
        status: 404,
        type: ResponseAppointmentDto,
        description: 'Not Found',
    })
    async update(@Req() req: Request, @Param('id') id: string, @Body() data: UpdateAppointmentDto) {
        const user = req.user as Auth;
        return this.appointmentsService.update(user, id, data);
    }
}
