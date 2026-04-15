import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CookieCheckerService } from '../cookie-checker/cookie-checker.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieCheckerService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.cookieService.getAccessToken(request);

    if (!token) {
      throw new UnauthorizedException('No access token');
    }

    try {
      const payload = this.tokenService.verifyAccessToken(token);
      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
