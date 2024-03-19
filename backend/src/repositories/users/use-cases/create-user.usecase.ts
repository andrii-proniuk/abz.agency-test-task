import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ICreateUserData } from '../interfaces/create-user-data.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    createUserData: ICreateUserData,
    transactionManager?: EntityManager,
  ): Promise<User> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(User).save(createUserData);
  }
}
