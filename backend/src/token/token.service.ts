import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { GenerateTokenResponseDto } from './response-dto/generate-token.response-dto';
import { AesConfig } from '../config/configuration.types';
import { TokensRepositoryService } from '../repositories/tokens/tokens-repository.service';
import { AesHelper } from './helpers/aes.helper';

@Injectable()
export class TokenService {
  private aesConfig: AesConfig;

  constructor(
    private tokensRepositoryService: TokensRepositoryService,
    configService: ConfigService,
  ) {
    this.aesConfig = configService.get<AesConfig>('aes');
  }

  private async generateTokenValue(): Promise<string> {
    const expiresIn = Date.now() + this.aesConfig.expiration;

    const token = await this.tokensRepositoryService.create(expiresIn);

    const value = {
      token: token.value,
      exp: expiresIn,
    };

    return JSON.stringify(value);
  }

  async generateToken(): Promise<GenerateTokenResponseDto> {
    const iv = crypto.randomBytes(16);

    const plainValue = await this.generateTokenValue();

    const encryptedValue = AesHelper.encryptValue(
      this.aesConfig.key,
      iv,
      plainValue,
    );

    const mac = AesHelper.generateMac(this.aesConfig.key, encryptedValue);

    const token = {
      iv: iv.toString('base64'),
      value: encryptedValue,
      mac,
    };

    return plainToInstance(GenerateTokenResponseDto, {
      token: Buffer.from(JSON.stringify(token), 'utf8').toString('base64'),
    });
  }
}
