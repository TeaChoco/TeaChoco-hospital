//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.controller.ts"
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Logger } from '@nestjs/common';

@Controller('socket')
export class SocketController {
    private readonly logger = new Logger(SocketController.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    @Get('cache')
    async getCache() {
        const cacheStore = this.cacheManager.stores;
        const cacheKeys =
            'keys' in cacheStore && typeof cacheStore.keys === 'function'
                ? ((await (cacheStore as any).keys()) as string[])
                : [];
        const cacheResults = await Promise.all(
            cacheKeys.map(async (cacheKey: string) => {
                const cacheValue = await this.cacheManager.get(cacheKey);
                return { [cacheKey]: cacheValue };
            }),
        );
        this.logger.log('cacheResults: ', cacheResults);
        return cacheResults.reduce(
            (accumulator, currentValue) => ({ ...accumulator, ...currentValue }),
            {},
        );
    }
}
