import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/common/exception';

export class UserNotFoundException extends DomainException {
  readonly statusCode = HttpStatus.NOT_FOUND;

  constructor() {
    super('User not found with this email');
  }
}
