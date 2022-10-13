import { MockFactory } from '@nestjs/testing';

import { ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);
export const MockProviders: MockFactory = token => {
  if (typeof token === 'function') {
    const mockMetadata = moduleMocker.getMetadata(token);
    const Mock = moduleMocker.generateFromMetadata(mockMetadata!);
    return new Mock();
  }
  // TODO: mock custom providers like dbProvider
};
