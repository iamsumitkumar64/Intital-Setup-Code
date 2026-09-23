import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { RegisterUserHandler } from "./register-user.handler";
import { RegisterUserDto } from "./register-user.dto";
import { CookieService } from "src/infrastructure/service/cookie/cookie.service";
import { PublicAuthenticate } from "src/infrastructure/decorator";


@Controller('/register')
export class RegisterUserController {
    constructor(
        private readonly registerUserHandler: RegisterUserHandler,
        private readonly cookieService: CookieService,
    ) { }

    @PublicAuthenticate()
    @Post()
    async registerUser(@Body() body: RegisterUserDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, ...data } = await this.registerUserHandler.handle(body);
        this.cookieService.setCookie(res, 'token', access_token);
        this.cookieService.setCookie(res, 'role', data.user.role);
        return {
            message: 'Registered User',
            data: data
        };
    }
}
