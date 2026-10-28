import { Module } from "@nestjs/common";
import { LoginUserModule } from "./login-user/login-user.module.js";
import { RegisterUserModule } from "./register-user/register-user.module.js";
import { LogOutUserModule } from "./log-out-user/log-out-user.module.js";
import { FirebaseLoginUserModule } from "./firebase-login-user/firebase-login-user.module.js";

@Module({
    imports: [
        LoginUserModule,
        RegisterUserModule,
        LogOutUserModule,
        FirebaseLoginUserModule,
    ],
})
export class AuthModule { }