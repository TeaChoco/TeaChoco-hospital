//-Path: "TeaChoco-Hospital/server/src/main.ts"
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import cookieParserSDK from 'cookie-parser';
import { SecureService } from './secure/secure.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './api/socket/socket.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
    const time = Date.now();
    const app = (await NestFactory.create(AppModule)) as NestExpressApplication;
    const secureService = app.get(SecureService);
    const authMiddleware = new AuthMiddleware(secureService);
    const { SERVER_HOST, SERVER_PORT, CLIENT_URL, MONGODB_URI } = secureService.getEnvConfig();

    app.useWebSocketAdapter(new SocketIoAdapter(app, secureService));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(json({ limit: '50mb' }));
    app.use(cookieParserSDK());
    app.enableCors({
        origin: secureService.getAllowedUrls(),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        credentials: true,
    });
    app.use(authMiddleware.use.bind(authMiddleware));

    if (secureService.isDev()) {
        const theme = new SwaggerTheme();
        const themeKeys = Object.keys(SwaggerThemeNameEnum);
        const config = new DocumentBuilder()
            .setTitle('TeaChoco Hospital Server Rest API')
            .setDescription(
                'Rest API for TeaChoco Hospital Projects. have many theme support. have /api-classic, /api-dark-monokai, /api-dark, /api-dracula, /api-feeling-blue, /api-flattop, /api-gruvbox, /api-material, /api-monokai, /api-muted, /api-newspaper, /api-nord-dark, /api-one-dark, /api-outline',
            )
            .setVersion('0.0.4')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document, {
            explorer: true,
            swaggerOptions: {
                authAction: {
                    defaultBearerAuth: {
                        name: 'defaultBearerAuth',
                        schema: {
                            type: 'http',
                            scheme: 'basic',
                        },
                        value: 'Basic <base64_encoded_credentials>',
                    },
                },
            },
        });
        themeKeys.forEach((key) => {
            SwaggerModule.setup(`api-${key.toLocaleLowerCase()}`, app, document, {
                explorer: true,
                customCss: theme.getBuffer(SwaggerThemeNameEnum[key]),
            });
        });
    }
    const port = Number(SERVER_PORT) ?? 3000;
    const host = SERVER_HOST ?? '0.0.0.0';
    await app.listen(port, host);

    Logger.debug(`🚀 Server is running on: ${await app.getUrl()} in ${Date.now() - time}ms`);
    Logger.debug(`📄 API Docs: ${await app.getUrl()}/api`);
    Logger.debug(`🌐 Client Origin: ${CLIENT_URL}`);
    Logger.debug(`🔴 Allowed Origins: ${secureService.getAllowedUrls().join(' , ')}`);
    Logger.debug(`📦 MongoDB URI configured: ${MONGODB_URI ? 'Yes' : 'No'}`);
}
bootstrap();
