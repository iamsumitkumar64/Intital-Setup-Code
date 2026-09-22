import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repository/user-repository/user-repository';
import { BcryptService } from 'src/infrastructure/service/bcrypt/bcrypt.service';
import { JwtHelperService } from 'src/infrastructure/service/jwt/jwt.service';
import { LoginUserDto } from './login-user.dto';
import {
  UserNotFoundException,
  InvalidCredentialsException,
} from 'src/domain/user/exception';

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
      message: 'Logged In User',
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
