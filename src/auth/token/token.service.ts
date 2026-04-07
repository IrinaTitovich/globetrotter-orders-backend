import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface AccessClaims {
  sub: number; // userId
  email: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(claims: AccessClaims) {
    return this.jwtService.signAsync(claims, { expiresIn: '15m' });
  }

  verifyAccessToken(token: string): AccessClaims {
    try {
      return this.jwtService.verify<AccessClaims>(token);
    } catch {
      throw new UnauthorizedException('invalid or expired token');
    }
  }
}
