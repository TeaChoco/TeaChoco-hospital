//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.controller.ts"
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SecureService } from 'src/secure/secure.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Res, Get, UseGuards, Controller, Req, Logger, Redirect } from '@nestjs/common';

@ApiTags('User Auth')
@Controller('user/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly secureService: SecureService,
    ) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    @ApiOperation({ summary: 'Initiate Google OAuth flow' })
    async googleAuth() {
        this.logger.log('Google OAuth initiated');
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    @Redirect()
    @ApiOperation({ summary: 'Google OAuth callback handler' })
    async googleAuthCallback(@Req() req: any, @Res() res: Response) {
        // this.logger.log('Google OAuth callback received');
        // const { CLIENT_URL } = this.secureService.getEnvConfig();
        // const frontendUrl = CLIENT_URL || 'http://localhost:5173';
        // try {
        //     if (!req.user) {
        //         throw new Error('No user data received from Google');
        //     }
        //     const result = await this.authService.login(req.user);
        //     this.logger.debug('User authenticated successfully', {
        //         email: req.user.email,
        //     });
        //     // Redirect to frontend with token
        //     const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`;
        //     return { url: redirectUrl };
        // } catch (error) {
        //     this.logger.error('Error in Google callback:', error);
        //     // Redirect to frontend with error
        //     const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
        //     const errorRedirect = `${frontendUrl}/login?error=${errorMessage}&source=google`;
        //     return { url: errorRedirect };
        // }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user profile from JWT token' })
    getProfile(@Req() req: any) {
        return {
            user: req.user,
            timestamp: new Date().toISOString(),
        };
    }

    @Get('signout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Sign out user' })
    async signout(@Res({ passthrough: true }) res): Promise<{ message: string }> {
        res.clearCookie('access_token', {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });

        return { message: 'Sign out successful' };
    }
}
