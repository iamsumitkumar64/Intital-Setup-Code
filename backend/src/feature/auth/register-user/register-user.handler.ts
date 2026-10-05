import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto.js';
import { Transactional } from 'typeorm-transactional';
import { UserRepository } from '../../../infrastructure/repository/user-repository/user-repository.js';
import { JwtHelperService } from '../../../infrastructure/service/jwt/jwt.service.js';
import { BcryptService } from '../../../infrastructure/service/bcrypt/bcrypt.service.js';
import { UserAlreadyExistsException } from '../../../domain/user/exception/index.js';

@Injectable()
export class RegisterUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtHelperService: JwtHelperService,
    private readonly bcryptService: BcryptService,
  ) { }

  @Transactional()
  async handle(body: RegisterUserDto) {
    // check if already exists using this email
    const isUserExists = await this.userRepository.findByEmail(body.email);
    if (isUserExists) {
      throw new UserAlreadyExistsException(body.email);
    }

    // hash password using bcrypt
    body.password = await this.bcryptService.hashPassword(body.password);

    // register user in DB
    const registeredUser = await this.userRepository.createUser(body);

    // generate token for accessing resources
    const token = await this.jwtHelperService.generateJwtToken(registeredUser);

    return {
      access_token: token,
      user: {
        username: registeredUser.username,
        email: registeredUser.email,
        role: registeredUser.role,
        uid: registeredUser.uuid,
      },
    };
  }
}
