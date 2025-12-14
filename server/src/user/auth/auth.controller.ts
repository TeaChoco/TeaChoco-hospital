//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.controller.ts"
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Res, Get, Post, Request, UseGuards, Controller, Req } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('User Auth')
@Controller('user/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    @UseGuards(GoogleAuthGuard)
    async getAuth(@Request() req): Promise<ResponseUserDto | null> {
        return req.user ?? null;
    }

    @Get('callback')
    async googleAuthRedirect(@Req() req: any, @Res() res) {
        try {
            const result = await this.authService.login(req.user);

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`;

            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error in Google callback:', error);
            res.redirect(
                `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`,
            );
        }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: any) {
        return {
            user: req.user,
            timestamp: new Date().toISOString(),
        };
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) res): Promise<{ message: string } | undefined> {
        res.clearCookie('access_token', {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        return { message: 'Logout successful' };
    }
}
