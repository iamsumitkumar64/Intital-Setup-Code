import { Global, Module } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { UserRepository } from "../repository/user-repository/user-repository";
import { JwtHelperService } from "../service/jwt/jwt.service";

@Global()
@Module({
    providers: [SocketService, JwtHelperService, UserRepository],
    exports: [],
})
export class SocketModule { }
