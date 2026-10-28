import { Module } from '@nestjs/common';
import { FirebaseLoginUserController } from './firebase-login-user.controller.js';
import { FirebaseLoginUserHandler } from './firebase-login-user.handler.js';
import { JwtHelperService } from '../../../infrastructure/service/jwt/jwt.service.js';
import { UserRepository } from '../../../infrastructure/repository/user-repository/user-repository.js';
import { FirebaseService } from '../../../infrastructure/service/firebase/firebase.service.js';
import { CookieService } from '../../../infrastructure/service/cookie/cookie.service.js';

@Module({
  imports: [],
  controllers: [FirebaseLoginUserController],
  providers: [
    JwtHelperService,
    UserRepository,
    FirebaseLoginUserHandler,
    FirebaseService,
    CookieService,
  ],
  exports: [],
})
export class FirebaseLoginUserModule { }
