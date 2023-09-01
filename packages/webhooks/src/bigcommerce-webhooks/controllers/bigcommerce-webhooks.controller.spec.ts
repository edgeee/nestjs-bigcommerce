import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceWebhooksController } from './bigcommerce-webhooks.controller';

describe('BigcommerceWebhooksController', () => {
  let controller: BigcommerceWebhooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BigcommerceWebhooksController],
    }).compile();

    controller = module.get<BigcommerceWebhooksController>(
      BigcommerceWebhooksController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
