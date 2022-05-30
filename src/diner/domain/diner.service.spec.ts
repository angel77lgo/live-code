import { Test, TestingModule } from '@nestjs/testing';
import { DinerService } from './diner.service';

describe('DinerService', () => {
  let service: DinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinerService],
    }).compile();

    service = module.get<DinerService>(DinerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
