import { Injectable } from '@nestjs/common';
import { PositionsRepositoryService } from '../repositories/positions/positions-repository.service';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { Position } from '../repositories/entities/position.entity';
import {
  SEEDER_PHONE_OPERATOR_CODES,
  SEEDER_POSITIONS_NAMES,
  SEEDER_USERS_COUNT,
} from './seeder.constants';
import { ICreateUserData } from '../repositories/users/interfaces/create-user-data.interface';
import { ImagesService } from '../images/images.service';
import { faker } from '@faker-js/faker';
import { TransactionService } from '../core/postgres/transaction.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private positionsRepositoryService: PositionsRepositoryService,
    private usersRepositoryService: UsersRepositoryService,
    private imagesService: ImagesService,
    private transactionService: TransactionService,
  ) {}

  private async createPositions(
    transactionManager: EntityManager,
  ): Promise<Position[]> {
    const positions = await this.positionsRepositoryService.getAll();

    if (positions.length >= SEEDER_POSITIONS_NAMES.length) {
      return positions;
    }

    if (!positions.length) {
      return this.positionsRepositoryService.createMany(
        SEEDER_POSITIONS_NAMES,
        transactionManager,
      );
    }

    const existPositionNames = positions.map(({ name }) => name);

    const positionsMap = new Map<string, boolean>(
      existPositionNames.map((name) => [name, true]),
    );

    const positionsNamesToCreate = SEEDER_POSITIONS_NAMES.filter(
      (name) => !positionsMap.get(name),
    );

    const createdPositions = await this.positionsRepositoryService.createMany(
      positionsNamesToCreate,
      transactionManager,
    );

    return [...positions, ...createdPositions];
  }

  private getRandomNumber(max: number): number {
    return Math.round(Math.random() * max);
  }

  private generatePhoneNumber(): string {
    const operatorCode =
      SEEDER_PHONE_OPERATOR_CODES[
        this.getRandomNumber(SEEDER_PHONE_OPERATOR_CODES.length - 1)
      ];

    const number = Array.from({ length: 7 })
      .map(() => this.getRandomNumber(9))
      .join('');

    return `+380${operatorCode}${number}`;
  }

  private async composeUser(positionId: number): Promise<ICreateUserData> {
    const photo = await this.imagesService.getRandomAvatarUrl();

    return {
      positionId,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: this.generatePhoneNumber(),
      photo,
    };
  }

  async runSeeder(): Promise<any> {
    await this.transactionService.transaction(async (transactionManager) => {
      const positions = await this.createPositions(transactionManager);

      const positionIds = positions.map(({ id }) => id);

      const getRandomPosition = () => {
        return positionIds[this.getRandomNumber(positionIds.length - 1)];
      };

      const usersData: ICreateUserData[] = [];

      // don't use Promise.all because thispersondoesnotexist.com sends the same image for multiple requests
      for (let i = 0; i < SEEDER_USERS_COUNT; i++) {
        const positionId = getRandomPosition();

        const userData = await this.composeUser(positionId);

        usersData.push(userData);
      }

      await this.usersRepositoryService.createMany(
        usersData,
        transactionManager,
      );
    });

    return {
      success: true,
    };
  }
}
