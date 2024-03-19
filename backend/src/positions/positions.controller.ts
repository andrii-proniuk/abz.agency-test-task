import { Controller, Get } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { GetPositionsResponseDto } from './response-dto/get-positions.response-dto';

@Controller('positions')
export class PositionsController {
  constructor(private positionsService: PositionsService) {}

  @Get()
  async getAll(): Promise<GetPositionsResponseDto> {
    return this.positionsService.getAll();
  }
}
