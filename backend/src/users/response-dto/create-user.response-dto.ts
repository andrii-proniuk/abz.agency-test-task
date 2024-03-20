import { Exclude, Expose, Transform } from 'class-transformer';
import { BaseSuccessResponseDto } from '../../common/response-dto/base-success.response-dto';

@Exclude()
export class CreateUserResponseDto extends BaseSuccessResponseDto {
  @Expose()
  user_id: number;

  @Expose()
  @Transform(() => 'New user successfully registered')
  message: string;
}
