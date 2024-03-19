import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { Position } from '../../entities/position.entity';

@Injectable()
export class CreatePositionsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    names: string[],
    transactionManager?: EntityManager,
  ): Promise<Position[]> {
    const entityManager = transactionManager || this.globalEntityManager;

    const positionsRepository = entityManager.getRepository(Position);

    const { identifiers } = await positionsRepository.insert(
      names.map((name) => ({ name })),
    );

    const positionsIds = identifiers.map(({ id }) => id);

    return positionsRepository.findBy({ id: In(positionsIds) });
  }
}
