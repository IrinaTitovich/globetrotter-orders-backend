import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth-guard.service';
import { TokenService } from '../token/token.service';
import { CookieCheckerService } from '../cookie-checker/cookie-checker.service';

describe('JwtAuthGuard', () => {
  let service: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: TokenService,
          useValue: {
            verifyAccessToken: jest.fn(),
          },
        },
        {
          provide: CookieCheckerService,
          useValue: {
            getAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
