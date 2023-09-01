import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceAuthService } from './bigcommerce-auth.service';

describe('BigcommerceAuthService', () => {
  let service: BigcommerceAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigcommerceAuthService],
    }).compile();

    service = module.get<BigcommerceAuthService>(BigcommerceAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
