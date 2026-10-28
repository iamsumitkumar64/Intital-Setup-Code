import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseLoginUserDto } from './firebase-login-user.dto.js';
import { UserRepository } from '../../../infrastructure/repository/user-repository/user-repository.js';
import { JwtHelperService } from '../../../infrastructure/service/jwt/jwt.service.js';
import { FirebaseService } from '../../../infrastructure/service/firebase/firebase.service.js';
import { UserRoleEnum } from '../../../domain/user/enum/user-role/user-role.enum.js';

@Injectable()
export class FirebaseLoginUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtHelperService: JwtHelperService,
    private readonly firebaseService: FirebaseService,
  ) { }

  async handle(body: FirebaseLoginUserDto) {
    let decodedToken;
    try {
      decodedToken = await this.firebaseService.verifyIdToken(body.idToken);
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || 'Invalid Firebase token');
    }

    const email = decodedToken.email;
    if (!email) {
      throw new UnauthorizedException('Firebase account has no email address');
    }

    // Check if user exists using this email
    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      const username = (decodedToken.name || email.split('@')[0]).trim();
      user = await this.userRepository.createUser({
        email,
        username,
        role: UserRoleEnum.USER,
      });
    }

    const access_token = await this.jwtHelperService.generateJwtToken(user);

    return {
      access_token: access_token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        uid: user.uuid,
      },
    };
  }
}
