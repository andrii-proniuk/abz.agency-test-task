import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TinifyConfig } from '../config/configuration.types';
import tinify from 'tinify';
import * as fs from 'fs/promises';

@Injectable()
export class ImagesService {
  private host: string;

  constructor(configService: ConfigService) {
    tinify.key = configService.get<TinifyConfig>('tinify').apiKey;
    this.host = configService.get<string>('host');
  }

  async getRandomAvatarUrl(): Promise<string> {
    const response = await fetch('https://thispersondoesnotexist.com/');
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return this.compressImage(buffer);
  }

  async compressImage(buffer: Buffer): Promise<string> {
    const fileName = String(Date.now()) + '.jpg';
    const filePath = `${process.cwd()}/public/${fileName}`;

    const source = tinify.fromBuffer(buffer);
    const resultBuffer = await source
      .resize({
        method: 'cover',
        height: 70,
        width: 70,
      })
      .toBuffer();

    fs.writeFile(filePath, resultBuffer);

    const url = `${this.host}/public/${fileName}`;

    return url;
  }
}
