import { Exclude, Expose } from 'class-transformer';
import { User } from '../../repositories/entities/user.entity';
import { BaseSuccessResponseDto } from '../../common/response-dto/base-success.response-dto';

@Exclude()
class Links {
  @Expose()
  next_url?: string;

  @Expose()
  prev_url?: string;
}

@Exclude()
export class GetUsersResponseDto extends BaseSuccessResponseDto {
  @Expose()
  page: number;

  @Expose()
  total_pages: number;

  @Expose()
  total_users: number;

  @Expose()
  count: number;

  @Expose()
  links: Links;

  @Expose()
  users: User[];
}
