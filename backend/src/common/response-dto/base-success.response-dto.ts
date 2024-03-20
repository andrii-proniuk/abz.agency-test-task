import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class BaseSuccessResponseDto {
  @Expose()
  @Transform(({ value }) => value || true)
  success: boolean;
}
