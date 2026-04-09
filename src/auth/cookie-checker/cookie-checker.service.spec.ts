import { Test, TestingModule } from '@nestjs/testing';
import { CookieCheckerService } from './cookie-checker.service';

describe('CookieCheckerService', () => {
  let service: CookieCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieCheckerService],
    }).compile();

    service = module.get<CookieCheckerService>(CookieCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
