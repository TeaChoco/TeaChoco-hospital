//-Path: "TeaChoco-Hospital/server/src/api/img/img.controller.ts"
import {
    Res,
    Req,
    Get,
    Put,
    Post,
    Body,
    Param,
    Delete,
    Logger,
    UseGuards,
    Controller,
    UploadedFile,
    UseInterceptors,
    NotFoundException,
} from '@nestjs/common';
import { Auth } from '../../types/auth';
import { ApiTags } from '@nestjs/swagger';
import { ImgService } from './img.service';
import type { Request, Response } from 'express';
import { UpdateImgDto } from './dto/update-img.dto';
import { ResponseImgDto } from './dto/response-img.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAuthGuard } from '../../user/auth/guard/user-auth.guard';

@ApiTags('Api Image')
@Controller('api/img')
export class ImgController {
    logger = new Logger(ImgController.name);

    constructor(private readonly imgService: ImgService) {}

    @Post()
    @UseGuards(UserAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        const user = req.user as Auth;
        this.logger.log(file);
        return this.imgService.create(user, file);
    }

    @Get()
    @UseGuards(UserAuthGuard)
    async findAll(@Req() req: Request): Promise<ResponseImgDto[]> {
        const user = req.user as Auth;
        return this.imgService.findAll(user);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        if (!id || id === 'undefined' || id.length !== 24) throw new NotFoundException();
        const image = await this.imgService.findOneRaw(id);
        if (!image) throw new NotFoundException();
        res.set('Content-Type', image.mimetype);
        res.send(image.data);
    }

    @Put(':id')
    @UseGuards(UserAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Req() req: Request,
        @Param('id') id: string,
        @Body() data: UpdateImgDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const user = req.user as Auth;
        return this.imgService.update(user, id, data, file);
    }

    @Delete(':id')
    @UseGuards(UserAuthGuard)
    async remove(@Req() req: Request, @Param('id') id: string) {
        const user = req.user as Auth;
        return this.imgService.remove(user, id);
    }
}
