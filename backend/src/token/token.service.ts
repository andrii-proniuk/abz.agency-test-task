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

  // private generateMac(encryptedValue: string): string {
  //   const hmac = crypto.createHmac('sha256', this.aesConfig.key);
  //   hmac.update(encryptedValue);

  //   return hmac.digest('hex');
  // }

  private async generateTokenValue(): Promise<string> {
    const expiresIn = Date.now() + this.aesConfig.expiration;

    const token = await this.tokensRepositoryService.create(expiresIn);

    const value = {
      token: token.value,
      exp: expiresIn,
    };

    return JSON.stringify(value);
  }

  // private encryptValue(plainValue: string, iv: Buffer): string {
  //   const cipher = crypto.createCipheriv('aes-256-cbc', this.aesConfig.key, iv);

  //   let encryptedValue = cipher.update(plainValue, 'utf8', 'base64');
  //   encryptedValue += cipher.final('base64');

  //   return encryptedValue;
  // }

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
