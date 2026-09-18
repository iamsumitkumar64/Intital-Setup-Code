import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { LoginUserHandler } from "./login-user.handler";
import { LoginUserDto } from "./login-user.dto";
import { CookieService } from "src/common/service/cookie.service";


@Controller('/login')
export class LoginUserController {
    constructor(
        private readonly loginUserHandler: LoginUserHandler,
        private readonly cookieService: CookieService,
    ) { }

    @Post()
    async loginUser(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, ...data } = await this.loginUserHandler.handle(body);
        this.cookieService.setCookie(res, 'token', access_token);
        return data;
    }
}
