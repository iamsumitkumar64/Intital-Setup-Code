import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repository/user-repository/user-repository';
import { BcryptService } from 'src/infrastructure/service/bcrypt/bcrypt.service';
import { RegisterUserDto } from './register-user.dto';
import { JwtHelperService } from 'src/infrastructure/service/jwt/jwt.service';
import { UserAlreadyExistsException } from 'src/domain/user/exception';

@Injectable()
export class RegisterUserHandler {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtHelperService: JwtHelperService,
    private readonly bcryptService: BcryptService,
  ) { }

  async handle(body: RegisterUserDto) {
    // check if already exists using this email
    const isUserExists = await this.userRepo.findByEmail(body.email);
    if (isUserExists) {
      throw new UserAlreadyExistsException(body.email);
    }

    // hash password using bcrypt
    body.password = await this.bcryptService.hashPassword(body.password);

    // register user in DB
    const registeredUser = await this.userRepo.createUser(body);

    // generate token for accessing resources
    const token = await this.jwtHelperService.generateJwtToken(registeredUser);

    return {
      message: 'Registered User',
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
