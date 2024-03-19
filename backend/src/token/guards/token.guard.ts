import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AesConfig } from '../../config/configuration.types';
import { ConfigService } from '@nestjs/config';
import { IToken } from '../interfaces/token.interface';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { TokensRepositoryService } from '../../repositories/tokens/tokens-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { AesHelper } from '../helpers/aes.helper';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

@Injectable()
export class TokenGuard implements CanActivate {
  private aesConfig: AesConfig;

  constructor(
    private tokensRepositoryService: TokensRepositoryService,
    configService: ConfigService,
  ) {
    this.aesConfig = configService.get<AesConfig>('aes');
  }

  private getTokenPayload(value: string): ITokenPayload | undefined {
    const buf = Buffer.from(value, 'base64');

    let token: IToken;

    try {
      token = JSON.parse(buf.toString('utf8')) as IToken;
    } catch {
      return;
    }

    const iv = Buffer.from(token.iv, 'base64');

    const calculatedMac = AesHelper.generateMac(
      this.aesConfig.key,
      token.value,
    );

    if (calculatedMac !== token.mac) {
      return;
    }

    const decrypted = AesHelper.decryptValue(
      this.aesConfig.key,
      iv,
      token.value,
    );

    return JSON.parse(decrypted);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const tokenHeader = req.headers.token as string | undefined;

    if (!tokenHeader) {
      throw new UnauthorizedException('The token is required');
    }

    const tokenPayload = this.getTokenPayload(tokenHeader);

    if (!tokenPayload) {
      throw new UnauthorizedException('The token invalid');
    }

    if (tokenPayload.exp < Date.now()) {
      throw new UnauthorizedException('The tokes expired');
    }

    const token = await this.tokensRepositoryService.getByValue(
      tokenPayload.token,
    );

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    req.token = token;

    return true;
  }
}
