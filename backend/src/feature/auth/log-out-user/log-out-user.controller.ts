import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CookieService } from 'src/infrastructure/service/cookie.service';

@Controller('/logout')
export class LogOutUserController {
  constructor(private readonly cookieService: CookieService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  logoutUser(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearTokenCookie(res);
    return { message: 'Logged out successfully' };
  }
}
