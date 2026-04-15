import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersCoreService } from '../users-core/users-core.service';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersCoreService,
          useValue: {
            create: jest.fn(),
            getByEmail: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            signAccessToken: jest.fn(),
            signRefreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
