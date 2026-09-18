import { Module } from "@nestjs/common";
import { RegisterUserController } from "./register-user.controller";
import { RegisterUserHandler } from "./register-user.handler";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/common/service/bcrypt.service";
import { JwtHelperService } from "src/common/service/jwt.service";
import { CookieService } from "src/common/service/cookie.service";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [JwtHelperService, UserRepository, RegisterUserHandler, BcryptService, CookieService],
    exports: [RegisterUserModule],
})
export class RegisterUserModule { }
