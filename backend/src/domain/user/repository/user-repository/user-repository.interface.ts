import { UserEntity } from 'src/domain/user/user.entity';

// can be used as DI Token
export const USER_REPOSITORY = Symbol('IUserRepository');

export interface IUserRepository {
  createUser(body: Partial<UserEntity>): Promise<UserEntity>;
  findByUuid(uuid: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}