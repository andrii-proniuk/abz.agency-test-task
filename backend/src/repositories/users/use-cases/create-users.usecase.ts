import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { ICreateUserData } from '../interfaces/create-user-data.interface';

@Injectable()
export class CreateUsersUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    createUsersData: ICreateUserData[],
    transactionManager?: EntityManager,
  ): Promise<User[]> {
    const entityManager = transactionManager || this.globalEntityManager;

    const usersRepository = entityManager.getRepository(User);

    const { identifiers } = await usersRepository.insert(createUsersData);

    const userIds = identifiers.map(({ id }) => id);

    return usersRepository.find({
      where: { id: In(userIds) },
      relations: { position: true },
    });
  }
}
