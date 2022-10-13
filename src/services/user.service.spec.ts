import { Test, TestingModule } from '@nestjs/testing';

import { MockProviders } from '@jest/utils';

import { UserService } from '@service/user';

describe.skip('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker(MockProviders)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
