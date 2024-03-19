import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { isNumberString, isInt, isPositive } from 'class-validator';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import { BadRequestException } from '../../common/exceptions/bad-request.exception';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id: idParam } = req.params;

    if (!isNumberString(idParam)) {
      throw new BadRequestException({
        user_id: ['The user_id must be a positive integer'],
      });
    }

    const userId = Number(idParam);

    if (!isInt(userId) || !isPositive(userId)) {
      throw new BadRequestException({
        user_id: ['The user_id must be a positive integer'],
      });
    }

    const user = await this.usersRepositoryService.getById(userId);

    if (!user) {
      throw new NotFoundException({
        message: 'The user with the requested identifier does not exist',
        fails: {
          user_id: ['User not found'],
        },
      });
    }

    return true;
  }
}
