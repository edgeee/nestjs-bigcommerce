import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceWebhooksService } from './bigcommerce-webhooks.service';

describe('BigcommerceWebhooksService', () => {
  let service: BigcommerceWebhooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigcommerceWebhooksService],
    }).compile();

    service = module.get<BigcommerceWebhooksService>(
      BigcommerceWebhooksService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
