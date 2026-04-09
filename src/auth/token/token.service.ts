import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface AccessClaims {
  sub: number; // userId
  email: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(claims: AccessClaims) {
    return this.jwtService.signAsync(claims, { expiresIn: '15m' });
  }

  signRefreshToken(claims: AccessClaims) {
    return this.jwtService.signAsync(claims, { expiresIn: '7d' });
  }

  refreshAccessToken(refreshToken: string) {
    try {
      const claim = this.jwtService.verify<AccessClaims>(refreshToken);

      return this.signAccessToken(claim);
    } catch {
      throw new UnauthorizedException('invalid or expired refresh token');
    }
  }

  verifyAccessToken(token: string): AccessClaims {
    try {
      return this.jwtService.verify<AccessClaims>(token);
    } catch {
      throw new UnauthorizedException('invalid or expired token');
    }
  }
}
