import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private seederService: SeederService) {}

  @Get()
  async runSeeder(): Promise<any> {
    return this.seederService.runSeeder();
  }
}
