import { Exclude, Expose } from 'class-transformer';
import { User } from '../../repositories/entities/user.entity';
import { DefaultSuccessResponseDto } from '../../common/response-dto/default-success.response-dto';

@Exclude()
class Links {
  @Expose()
  next_url?: string;

  @Expose()
  prev_url?: string;
}

@Exclude()
export class GetUsersResponseDto extends DefaultSuccessResponseDto {
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
