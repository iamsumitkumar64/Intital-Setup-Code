import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { RegisterUserHandler } from "./register-user.handler";
import { RegisterUserDto } from "./register-user.dto";
import { CookieService } from "src/infrastructure/service/cookie.service";


@Controller('/register')
export class RegisterUserController {
    constructor(
        private readonly registerUserHandler: RegisterUserHandler,
        private readonly cookieService: CookieService,
    ) { }

    @Post()
    async registerUser(@Body() body: RegisterUserDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, ...data } = await this.registerUserHandler.handle(body);
        this.cookieService.setTokenCookie(res, access_token);
        return data;
    }
}
