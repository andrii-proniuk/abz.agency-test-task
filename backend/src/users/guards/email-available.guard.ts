import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { isEmail } from 'class-validator';
import { ValidationFailedException } from '../../common/exceptions/validation-failed.exception';
import { ConflictException } from '../../common/exceptions/conflict.exception';

@Injectable()
export class EmailAvailableGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { email } = req.body as CreateUserDto;

    if (!email) {
      throw new ValidationFailedException({
        email: ['The email field is required'],
      });
    }

    if (!isEmail(email)) {
      throw new ValidationFailedException({
        email: ['The email must be a valid email address'],
      });
    }

    const isUserExistByEmail =
      await this.usersRepositoryService.existsByEmail(email);

    if (isUserExistByEmail) {
      throw new ConflictException(
        'User with this phone or email already exist',
      );
    }

    return true;
  }
}
