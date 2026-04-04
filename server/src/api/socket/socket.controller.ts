//-Path: "TeaChoco-Hospital/server/src/api/socket/socket.controller.ts"
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';

@Controller('socket')
export class SocketController {
    private readonly logger = new Logger(SocketController.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    @Get('cache')
    async allCache() {
        const allCacheData = {};
        const stores = this.cacheManager.stores;
        const primaryStore = Array.isArray(stores) ? stores[0] : stores;
        const cacheMap = primaryStore.store;

        // ถ้า cacheMap เป็น Map ให้ใช้ for...of
        if (cacheMap instanceof Map) {
            for (const [key, value] of cacheMap.entries()) {
                // key จะมี prefix 'keyv:' อยู่ข้างหน้า
                // value มี structure: { value: any, expires: number }
                const cleanKey = key.replace(/^keyv:/, ''); // ลบ prefix 'keyv:' ออก
                allCacheData[cleanKey] = value.value; // ดึงเฉพาะ value ที่แท้จริง
            }
        }

        this.logger.log('All cache data:', allCacheData);
        return {
            success: true,
            total: Object.keys(allCacheData).length,
            data: allCacheData,
        };
    }

    @Get('cache/set/:key/:value')
    async setCache(@Param('key') key: string, @Param('value') value: string) {
        const cacheSet = await this.cacheManager.set(key, value);
        return {
            key,
            value,
            cacheSet,
            message: 'Cache set',
        };
    }

    @Get('cache/get/:key')
    async getCache(@Param('key') key: string) {
        const cacheValue = await this.cacheManager.get(key);
        if (cacheValue === undefined) return { key, value: null, message: 'Cache not found' };
        return { key, value: cacheValue, message: 'Cache get' };
    }

    @Get('cache/del/:key')
    async delCache(@Param('key') key: string) {
        await this.cacheManager.del(key);
        return { key, message: 'Cache deleted' };
    }
}
