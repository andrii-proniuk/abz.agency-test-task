import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PositionsRepositoryService } from '../../repositories/positions/positions-repository.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { isInt, isNumberString, isPositive } from 'class-validator';
import { ValidationFailedException } from '../../common/exceptions/validation-failed.exception';

@Injectable()
export class PositionExistsGuard implements CanActivate {
  constructor(private positionsRepositoryService: PositionsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log({ body: req.body });

    const { position_id } = req.body as CreateUserDto;

    if (!position_id) {
      throw new ValidationFailedException({
        position_id: ['The position_id field is required'],
      });
    }

    const positionIdNumber = Number(position_id);

    if (
      !isNumberString(position_id) ||
      !isInt(positionIdNumber) ||
      !isPositive(positionIdNumber)
    ) {
      throw new ValidationFailedException({
        position_id: ['The position_id must be a positive integer'],
      });
    }

    const isPositionExist =
      await this.positionsRepositoryService.existsById(position_id);

    if (!isPositionExist) {
      throw new ValidationFailedException({
        position_id: ['Provided position does not exist'],
      });
    }

    return true;
  }
}
