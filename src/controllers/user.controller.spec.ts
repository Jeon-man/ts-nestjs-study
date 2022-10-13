import { Test, TestingModule } from '@nestjs/testing';

import { MockProviders } from '@jest/utils';

import { UserController } from '@controller/user';

import { AuthGuard } from '@guard';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker(MockProviders)
      .overrideGuard(AuthGuard)
      .useValue(MockProviders(AuthGuard))
      .compile();

    controller = module.get(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
