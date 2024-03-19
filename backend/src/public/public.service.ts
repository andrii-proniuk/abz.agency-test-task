import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class PublicService {
  async getPublicFile(fileName: string): Promise<any> {
    const file = await fs.readFile(`${process.cwd()}/public/${fileName}`);
  }
}
