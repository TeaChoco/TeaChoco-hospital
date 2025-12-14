//-Path: "TeaChoco-Hospital/server/src/user/auth/guard/google-auth.guard.ts"
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
