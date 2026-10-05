import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './login-user.dto.js';
import { UserRepository } from '../../../infrastructure/repository/user-repository/user-repository.js';
import { JwtHelperService } from '../../../infrastructure/service/jwt/jwt.service.js';
import { BcryptService } from '../../../infrastructure/service/bcrypt/bcrypt.service.js';
import { InvalidCredentialsException, UserNotFoundException } from '../../../domain/user/exception/index.js';

@Injectable()
export class LoginUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtHelperService: JwtHelperService,
    private readonly bcryptService: BcryptService,
  ) { }

  async handle(body: LoginUserDto) {
    // check if user exists using this email
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) {
      throw new UserNotFoundException();
    }

    // verify password
    const isValid = await this.bcryptService.verifyPassword(body.password, user.password);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    const token = await this.jwtHelperService.generateJwtToken(user);

    return {
      access_token: token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        uid: user.uuid,
      },
    };
  }
}
