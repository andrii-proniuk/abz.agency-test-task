import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Position } from '../../entities/position.entity';

@Injectable()
export class CreatePositionUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    name: string,
    transactionManager?: EntityManager,
  ): Promise<Position> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Position).save({ name });
  }
}
