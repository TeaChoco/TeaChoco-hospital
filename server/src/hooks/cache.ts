//-Path: "TeaChoco-Hospital/server/src/hooks/cache.ts"
import { CacheModule } from '@nestjs/cache-manager';
import { SecureService } from '../secure/secure.service';

export function imnportCache() {
    return CacheModule.registerAsync({
        inject: [SecureService],
        useFactory: async (secureService: SecureService) => ({
            max: 100,
            ttl: 5 * 60,
        }),
    });
}
