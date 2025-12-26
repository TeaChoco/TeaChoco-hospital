//-Path: "TeaChoco-Hospital/server/src/auth/auth.middleware.ts"
import { IncomingHttpHeaders } from 'http';
import { SecureService } from '../secure/secure.service';
import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    logger = new Logger(AuthMiddleware.name);

    constructor(private readonly secureService: SecureService) {}

    private readonly publicGets = ['/', '/socket-ui', '/public**'];

    use(req: Request, res: Response, next: NextFunction) {
        if (this.secureService.isDev()) return next();
        let callback: unknown = null;
        const { method, headers } = req;
        const clientOrigin = req.headers.origin || req.headers.referer || '';

        const publicPaths = this.publicGets.find(
            (path) =>
                req.path === path ||
                (path.endsWith('**') && req.path.startsWith(path.slice(0, -2))),
        );
        if (method === 'GET') {
            if (publicPaths) return next();
            callback = this.checkUrl(res, clientOrigin);
        } else {
            callback = this.checkToken(res, headers);
            if (callback === null) callback = this.checkUrl(res, clientOrigin);
        }
        if (callback === null) return next();
        return callback;
    }

    checkUrl(res: Response, origin: string) {
        const allowedUrls = this.secureService.getAllowedUrls();
        this.logger.log(`Allowed URLs: ${allowedUrls.join(' , ')}`);
        this.logger.log(`Original URL: ${origin}`);
        if (allowedUrls.includes(origin)) return null;
        return res.status(400).json({ message: 'Bad Request' });
    }

    checkToken(res: Response, headers: IncomingHttpHeaders) {
        const appHeader = headers['apporization'];
        if (appHeader && typeof appHeader === 'string' && appHeader.startsWith('Bearer ')) {
            const token = appHeader.split(' ')[1];
            const { VITE_API_TOKEN_KEY } = this.secureService.getEnvConfig();
            if (token === VITE_API_TOKEN_KEY) return null;
            return res.status(403).json({ message: 'Forbidden' });
        }
        return res.status(401).json({ message: 'Unapporized' });
    }
}
