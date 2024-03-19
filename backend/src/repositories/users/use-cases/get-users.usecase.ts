import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetUsersDto } from '../../../users/dto/get-users.dto';
import { User } from '../../entities/user.entity';
import { IItemsAndCount } from '../../../common/interfaces/items-and-count.interface';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    { page, per_page }: GetUsersDto,
    transactionManager?: EntityManager,
  ): Promise<IItemsAndCount<User>> {
    const entityManager = transactionManager || this.globalEntityManager;

    const [items, count] = await entityManager
      .getRepository(User)
      .findAndCount({
        relations: {
          position: true,
        },
        take: per_page,
        skip: per_page * (page - 1),
      });

    return {
      items,
      count,
    };
  }
}
