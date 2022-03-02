import { Test, TestingModule } from '@nestjs/testing';
import { DebtGroupController } from './debt-group.controller';

describe('DebtGroupController', () => {
  let controller: DebtGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtGroupController],
    }).compile();

    controller = module.get<DebtGroupController>(DebtGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
