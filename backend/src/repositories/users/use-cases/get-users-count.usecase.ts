import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class GetUsersCountUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(transactionManager?: EntityManager): Promise<number> {
    const entityManager = transactionManager || this.globalEntityManager;

    const count = await entityManager.getRepository(User).count();

    return count;
  }
}
