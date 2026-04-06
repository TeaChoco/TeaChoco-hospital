//-Path: "TeaChoco-Hospital/server/src/app.service.ts"
import packageJson from '../package.json';
import { Injectable } from '@nestjs/common';
import { SecureService } from './secure/secure.service';

@Injectable()
export class AppService {
    constructor(private readonly secureService: SecureService) {}

    getHello(): object {
        return { isDev: this.secureService.isDev(), version: packageJson.version };
    }

    getAllEnv(): Record<string, string> {
        return this.secureService.getEnvConfig();
    }
}
