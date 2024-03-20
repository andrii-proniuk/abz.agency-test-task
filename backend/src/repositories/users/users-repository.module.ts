import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUsersUseCase } from './use-cases/get-users.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UserExistsUseCase } from './use-cases/user-exists.usecase';
import { CreateUsersUseCase } from './use-cases/create-users.usecase';
import { GetUsersCountUseCase } from './use-cases/get-users-count.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepositoryService,
    CreateUserUseCase,
    CreateUsersUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    UserExistsUseCase,
    GetUsersCountUseCase,
  ],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
