//-Path: "TeaChoco-Hospital/server/src/app.service.ts"
import { Injectable } from '@nestjs/common';
import { SecureService } from './secure/secure.service';

@Injectable()
export class AppService {
    constructor(private readonly secureService: SecureService) {}

    getHello(): object {
        return { isDev: this.secureService.isDev(), version: '0.0.1' };
    }

    getAllEnv(): Record<string, string> {
        return this.secureService.getEnvConfig();
    }
}
