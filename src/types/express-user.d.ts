import 'express-serve-static-core';
import type { AccessClaims } from '../auth/token/token.service';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AccessClaims;
  }
}
