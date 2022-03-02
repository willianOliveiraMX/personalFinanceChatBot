import { Test, TestingModule } from '@nestjs/testing';
import { DebtGroupService } from './debt-group.service';

describe('DebtGroupService', () => {
  let service: DebtGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtGroupService],
    }).compile();

    service = module.get<DebtGroupService>(DebtGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
