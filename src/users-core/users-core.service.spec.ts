import { Test, TestingModule } from '@nestjs/testing';
import { UsersCoreService } from './users-core.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersCoreService', () => {
  let service: UsersCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersCoreService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersCoreService>(UsersCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
