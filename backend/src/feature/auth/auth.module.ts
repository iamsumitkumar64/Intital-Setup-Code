import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { LoginUserModule } from "./login-user/login-user.module.js";
import { RegisterUserModule } from "./register-user/register-user.module.js";
import { LogOutUserModule } from "./log-out-user/log-out-user.module.js";

@Module({
    imports: [
        LoginUserModule,
        RegisterUserModule,
        LogOutUserModule,
        RouterModule.register([
            {
                path: 'auth',
                children: [
                    { path: '', module: LoginUserModule },
                    { path: '', module: RegisterUserModule },
                    { path: '', module: LogOutUserModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AuthModule { }