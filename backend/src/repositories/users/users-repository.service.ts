import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUsersUseCase } from './use-cases/get-users.usecase';
import { User } from '../entities/user.entity';
import { ICreateUserData } from './interfaces/create-user-data.interface';
import { EntityManager, ILike } from 'typeorm';
import { GetUsersDto } from '../../users/dto/get-users.dto';
import { IItemsAndCount } from '../../common/interfaces/items-and-count.interface';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UserExistsUseCase } from './use-cases/user-exists.usecase';
import { CreateUsersUseCase } from './use-cases/create-users.usecase';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createUsersUseCase: CreateUsersUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private userExistsUseCase: UserExistsUseCase,
  ) {}

  async create(
    createUserData: ICreateUserData,
    transactionManager?: EntityManager,
  ): Promise<User> {
    return this.createUserUseCase.exec(createUserData, transactionManager);
  }

  async createMany(
    createUsersData: ICreateUserData[],
    transactionManager?: EntityManager,
  ): Promise<User[]> {
    return this.createUsersUseCase.exec(createUsersData, transactionManager);
  }

  async getUsers(
    getUsersDto: GetUsersDto,
    transactionManager?: EntityManager,
  ): Promise<IItemsAndCount<User>> {
    return this.getUsersUseCase.exec(getUsersDto, transactionManager);
  }

  async getById(id: number, transactionManager?: EntityManager): Promise<User> {
    return this.getUserByIdUseCase.exec(id, transactionManager);
  }

  async existsById(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.userExistsUseCase.exec({ id }, transactionManager);
  }

  async existsByEmail(
    email: string,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.userExistsUseCase.exec(
      { email: ILike(email) },
      transactionManager,
    );
  }

  async existsByPhone(
    phone: string,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.userExistsUseCase.exec({ phone }, transactionManager);
  }
}
