import { Request } from 'express';
import { AccessClaims } from '../token/token.service';

export interface AuthenticatedRequest extends Request {
  user: AccessClaims;
}
