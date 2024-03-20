import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SetRequestTimeout } from '../common/decorators/set-request-timeout.decorator';
import { BaseSuccessResponseDto } from '../common/response-dto/base-success.response-dto';

@Controller('seeder')
export class SeederController {
  constructor(private seederService: SeederService) {}

  @Get()
  @SetRequestTimeout(180000)
  async runSeeder(): Promise<BaseSuccessResponseDto> {
    return this.seederService.runSeeder();
  }

  @Get('test')
  @SetRequestTimeout(10000)
  async test(): Promise<void> {
    return new Promise((resolve) => {
      setInterval(resolve, 20000);
    });
  }
}
