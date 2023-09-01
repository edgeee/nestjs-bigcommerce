import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceCoreService } from '@nestjs-bigcommerce/core/src/bigcommerce-core/bigcommerce-core.service';
import { BIGCOMMERCE_CORE_OPTIONS } from './bigcommerce-core.constants';

describe('BigcommerceCoreService', () => {
  let service: BigcommerceCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BigcommerceCoreService,
        {
          provide: BIGCOMMERCE_CORE_OPTIONS,
          useValue: { clientId: 'client-id', clientSecret: 'client-secret' },
        },
      ],
    }).compile();

    service = module.get<BigcommerceCoreService>(BigcommerceCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
