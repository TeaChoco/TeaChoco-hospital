//- Path: "TeaChoco-Hospital/server/src/api/img/dto/create-img.dto.ts"
import { ApiProperty } from '@nestjs/swagger';
import { ApiMetaDto } from '../../../types/dto';
import { IsString } from 'class-validator';

export class CreateImgDto extends ApiMetaDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    mimetype: string;

    data: Buffer;
}
