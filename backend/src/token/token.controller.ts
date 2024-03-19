import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TokenService } from './token.service';
import { GenerateTokenResponseDto } from './response-dto/generate-token.response-dto';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  async generateToken(): Promise<GenerateTokenResponseDto> {
    return this.tokenService.generateToken();
  }

  @Get('validate')
  @UseInterceptors(AuthInterceptor)
  async validateToken(): Promise<any> {
    return {
      success: true,
    };
  }
}
