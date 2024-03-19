import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user.response-dto';
import { DefaultSuccessResponseDto } from '../../common/response-dto/default-success.response-dto';

@Exclude()
export class GetUserByIdResponseDto extends DefaultSuccessResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
