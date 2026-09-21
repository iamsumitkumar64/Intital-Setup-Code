import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/common/exception';

export class UserAlreadyExistsException extends DomainException {
  readonly statusCode = HttpStatus.CONFLICT;

  constructor(email: string) {
    super(`User already exists with email: ${email}`);
  }
}
