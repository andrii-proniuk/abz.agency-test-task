import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class DefaultSuccessResponseDto {
  @Expose()
  @Transform(({ value }) => value || true)
  success: boolean;
}
