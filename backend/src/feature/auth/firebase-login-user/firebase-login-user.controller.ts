import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { FirebaseLoginUserHandler } from './firebase-login-user.handler.js';
import { FirebaseLoginUserDto } from './firebase-login-user.dto.js';
import { CookieService } from '../../../infrastructure/service/cookie/cookie.service.js';
import { PublicAuthenticate } from '../../../infrastructure/decorator/public-authenticate/public-authenticate.decorator.js';

@Controller('/auth/firebase-login')
export class FirebaseLoginUserController {
  constructor(
    private readonly firebaseLoginUserHandler: FirebaseLoginUserHandler,
    private readonly cookieService: CookieService,
  ) { }

  @PublicAuthenticate()
  @Post()
  async firebaseLogin(@Body() body: FirebaseLoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, ...data } = await this.firebaseLoginUserHandler.handle(body);
    this.cookieService.setCookie(res, 'access_token', access_token);
    this.cookieService.setCookie(res, 'role', data.user.role);
    return {
      message: 'Logged In User',
      data: data,
    };
  }
}
