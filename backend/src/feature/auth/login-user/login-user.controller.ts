import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { LoginUserHandler } from "./login-user.handler";
import { LoginUserDto } from "./login-user.dto";
import { CookieService } from "src/infrastructure/service/cookie/cookie.service";
import { PublicAuthenticate } from "src/infrastructure/decorator/public-authenticate/public-authenticate.decorator";

@Controller('/login')
export class LoginUserController {
    constructor(
        private readonly loginUserHandler: LoginUserHandler,
        private readonly cookieService: CookieService,
    ) { }

    @PublicAuthenticate()
    @Post()
    async loginUser(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, ...data } = await this.loginUserHandler.handle(body);
        this.cookieService.setCookie(res, 'token', access_token);
        this.cookieService.setCookie(res, 'role', data.user.role);
        return {
            message: 'Logged In User',
            data: data
        };
    }
}
