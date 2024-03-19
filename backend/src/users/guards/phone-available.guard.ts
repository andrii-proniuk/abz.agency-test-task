import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { isPhoneNumber, matches } from 'class-validator';
import { ValidationFailedException } from '../../common/exceptions/validation-failed.exception';
import { ConflictException } from '../../common/exceptions/conflict.exception';

@Injectable()
export class PhoneAvailableGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { phone } = req.body as CreateUserDto;

    if (!phone) {
      throw new ValidationFailedException({
        phone: ['The phone field is required'],
      });
    }

    if (!matches(phone, /^\+380\d+/) || !isPhoneNumber(phone, 'UA')) {
      throw new ValidationFailedException({
        phone: ['The phone must be a valid phone with UA country code'],
      });
    }

    const isUserExistByPhone =
      await this.usersRepositoryService.existsByPhone(phone);

    if (isUserExistByPhone) {
      throw new ConflictException(
        'User with this phone or email already exist',
      );
    }

    return true;
  }
}
