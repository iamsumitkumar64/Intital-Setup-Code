import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response, CookieOptions } from 'express';
import * as cookie from 'cookie';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  getCookieOptions(): CookieOptions {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  setTokenCookie(res: Response, token: string) {
    res.cookie('token', token, this.getCookieOptions());
  }

  clearTokenCookie(res: Response) {
    res.clearCookie('token', this.getCookieOptions());
  }

  extractToken(req: Request): string | undefined {
    const cookies = req.cookies as Record<string, string> | undefined;
    return cookies?.token;
  }

  static extractTokenFromHeader(cookieHeader?: string): string | undefined {
    if (!cookieHeader) return undefined;
    return cookie.parse(cookieHeader).token;
  }
}
