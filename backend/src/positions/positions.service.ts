import { Injectable } from '@nestjs/common';
import { PositionsRepositoryService } from '../repositories/positions/positions-repository.service';
import { GetPositionsResponseDto } from './response-dto/get-positions.response-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PositionsService {
  constructor(private positionsRepositoryService: PositionsRepositoryService) {}

  async getAll(): Promise<GetPositionsResponseDto> {
    const positions = await this.positionsRepositoryService.getAll();

    return plainToInstance(GetPositionsResponseDto, {
      positions,
    });
  }
}
