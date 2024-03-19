import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GenerateTokenResponseDto {
  @Expose()
  success = true;

  @Expose()
  token: string;
}
