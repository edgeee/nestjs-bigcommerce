import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceCoreService } from './bigcommerce-core.service';

describe('BigcommerceCoreService', () => {
  let service: BigcommerceCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigcommerceCoreService],
    }).compile();

    service = module.get<BigcommerceCoreService>(BigcommerceCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
