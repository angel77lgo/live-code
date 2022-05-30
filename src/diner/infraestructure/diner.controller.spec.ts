import { Test, TestingModule } from '@nestjs/testing';
import { DinerController } from './diner.controller';

describe('DinerController', () => {
  let controller: DinerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinerController],
    }).compile();

    controller = module.get<DinerController>(DinerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
