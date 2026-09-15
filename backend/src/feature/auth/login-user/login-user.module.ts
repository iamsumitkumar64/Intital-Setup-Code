import { Module } from "@nestjs/common";
import { LoginUserController } from "./login-user.controller";
import { LoginUserHandler } from "./login-user.handler";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import { CookieService } from "src/infrastructure/service/cookie.service";

@Module({
    imports: [],
    controllers: [LoginUserController],
    providers: [JwtHelperService, UserRepository, LoginUserHandler, BcryptService, CookieService],
    exports: [LoginUserModule],
})
export class LoginUserModule { }
