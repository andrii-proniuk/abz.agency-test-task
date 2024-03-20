import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user.response-dto';
import { BaseSuccessResponseDto } from '../../common/response-dto/base-success.response-dto';

@Exclude()
export class GetUserByIdResponseDto extends BaseSuccessResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
