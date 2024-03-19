import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Token } from '../../entities/token.entity';

@Injectable()
export class DeleteTokenUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(id: number, transactionManager?: EntityManager): Promise<void> {
    const entityManager = transactionManager || this.globalEntityManager;

    await entityManager.getRepository(Token).delete({ id });
  }
}
