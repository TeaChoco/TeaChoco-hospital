//-Path: "TeaChoco-Hospital/server/src/user/auth/auth.controller.ts"
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Auth, ReqUserDto, UserLoginDto } from '../dto/user.dto';
import { SecureService } from '../../secure/secure.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Get, Res, Req, Logger, UseGuards, Controller, Redirect, Post } from '@nestjs/common';

@ApiTags('User Auth')
@Controller('user/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly secureService: SecureService,
    ) {}

    // @Put()
    // @ApiBody({})
    // @ApiOperation({ summary: 'Get password hash' })
    // async getPassword(@Body() body: { password: string }) {
    //     return this.authService.login(body.password);
    // }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Login successful',
    })
    @ApiOperation({ summary: 'Login' })
    @ApiBody({
        required: true,
        type: UserLoginDto,
    })
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { accessToken } = await this.authService.login(req.user as ReqUserDto);
        if (accessToken) {
            res.cookie('access_token', accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return {
                message: 'Login successful',
                user: await this.authService.signin(req.user as ReqUserDto),
            };
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get authenticated user info' })
    async getAuth(@Req() req: Request): Promise<ResponseUserDto | null> {
        const user = req.user as Auth;
        if (!user) return null;
        const responseUser = await this.authService.signin(user);
        return responseUser.user;
    }

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
    async googleAuthCallback(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<{ url: string }> {
        this.logger.log('Google OAuth callback received');
        const { CLIENT_URL } = this.secureService.getEnvConfig();
        const frontendUrl = CLIENT_URL || 'http://localhost:5173';
        try {
            const user = req.user as Auth;
            if (!user) throw new Error('No user data received from Google');
            const result = await this.authService.signin(user);
            res.cookie('access_token', result.access_token, {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return { url: frontendUrl };
        } catch (error) {
            this.logger.error('Error in Google callback:', error);
            const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
            const errorRedirect = `${frontendUrl}/signin?error=${errorMessage}&source=google`;
            return { url: errorRedirect };
        }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user profile from JWT token' })
    getProfile(@Req() req: Request): { user: Auth; timestamp: string } {
        const user = req.user as Auth;
        return { user, timestamp: new Date().toISOString() };
    }

    @Get('signout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Sign out user' })
    async signout(@Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
        res.clearCookie('access_token', {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        return { message: 'Sign out successful' };
    }
}
