import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(id: number, transactionManager?: EntityManager): Promise<User> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(User).findOne({
      where: { id },
      relations: { position: true },
    });
  }
}
