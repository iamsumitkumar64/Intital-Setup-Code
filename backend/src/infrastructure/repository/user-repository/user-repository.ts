import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../../domain/user/user.entity.js';
import { IUserRepository } from '../../../domain/user/repository/index.js';

@Injectable()
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(body: Partial<UserEntity>) {
    const user = this.create(body);
    return await this.save(user);
  }

  async findByUuid(uuid: string) {
    return await this.findOne({
      where: { uuid },
      select: {
        email: true,
        username: true,
        uuid: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.findOne({
      where: { email },
      select: {
        email: true,
        username: true,
        uuid: true,
        password: true,
        role: true,
      },
    });
  }
}