import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/common/exception';

export class InvalidCredentialsException extends DomainException {
  readonly statusCode = HttpStatus.UNAUTHORIZED;

  constructor() {
    super('Mismatched email or password');
  }
}
