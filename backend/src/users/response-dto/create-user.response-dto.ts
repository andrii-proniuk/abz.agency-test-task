import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CreateUserResponseDto {
  @Expose()
  user_id: number;

  @Expose()
  @Transform(() => 'New user successfully registered')
  message: string;
}
