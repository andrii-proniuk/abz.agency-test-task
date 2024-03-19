import { PaginationResponseDto } from './pagination.response-dto';
import { UserResponseDto } from './user.response-dto';

export interface GetUsersResponseDto extends PaginationResponseDto {
  users: UserResponseDto[];
}
