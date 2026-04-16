import { Injectable } from '@nestjs/common';
import type { Response, Request } from 'express';

@Injectable()
export class CookieCheckerService {
  private readonly ACCESS = 'access_token';
  private readonly REFRESH = 'refresh_token';

  setCookie(res: Response, payload: { accessToken; refreshToken }) {
    res.cookie(this.ACCESS, payload.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie(this.REFRESH, payload.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  clear(res: Response) {
    res.clearCookie(this.ACCESS, {
      path: '/',
    });

    res.clearCookie(this.REFRESH, {
      path: '/auth/refresh',
    });
  }

  getAccessToken(req: Request): string | null {
    return this.toNullableString(req.cookies, this.ACCESS);
  }

  getRefreshToken(req: Request): string | null {
    return this.toNullableString(req.cookies, this.REFRESH);
  }

  private toNullableString(
    value: Request['cookies'],
    name: string,
  ): string | null {
    if (!value) {
      return null;
    }

    const cookieValue = value[name];

    return typeof cookieValue === 'string' ? cookieValue : null;
  }
}
