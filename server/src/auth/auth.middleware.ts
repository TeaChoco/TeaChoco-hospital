//-Path: "TeaChoco-Hospital/server/src/auth/auth.middleware.ts"
import { IncomingHttpHeaders } from 'http';
import { SecureService } from '../secure/secure.service';
import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    logger = new Logger(AuthMiddleware.name);

    constructor(private readonly secureService: SecureService) {}

    private readonly publicGets = [
        '/',
        '/public**',
        '/api/img**',
        '/socket-ui',
        '/user/auth/google/callback',
    ];

    use(req: Request, res: Response, next: NextFunction) {
        if (this.secureService.isDev()) return next();
        const { method, headers } = req;
        const clientOrigin = req.headers.origin || req.headers.referer || '';

        const publicPaths = this.publicGets.find(
            (path) =>
                req.path === path ||
                (path.endsWith('**') && req.path.startsWith(path.slice(0, -2))),
        );

        let callback: Response | null = null;
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

    checkUrl(res: Response, origin: string): Response | null {
        const allowedUrls = this.secureService.getAllowedUrls();
        if (allowedUrls.find((allowedUrl) => origin.startsWith(allowedUrl))) return null;
        return res.status(400).json({ message: 'Bad Request: Invalid Origin' });
    }

    checkToken(res: Response, headers: IncomingHttpHeaders): Response | null {
        const authHeader = headers.authorization;
        if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const { VITE_API_TOKEN_KEY } = this.secureService.getEnvConfig();
            if (token === VITE_API_TOKEN_KEY) return null;
            return res.status(403).json({ message: 'Forbidden: Invalid API Token' });
        }
        return res.status(401).json({ message: 'Unauthorized: Missing API Token' });
    }
}
