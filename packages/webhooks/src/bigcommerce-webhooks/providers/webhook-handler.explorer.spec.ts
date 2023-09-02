import { Test, TestingModule } from '@nestjs/testing';
import { WebhookHandlerExplorer } from './webhook-handler.explorer';
import { Injectable } from '@nestjs/common';
import { AbstractBigCommerceWebhookHandler } from './bigcommerce-webhook-handler';
import { BigcommerceWebhookHandler } from '../decorators';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';

@Injectable()
@BigcommerceWebhookHandler([
  'products/variants/created',
  'products/variants/deleted',
  'products/variants/updated',
])
class TestWebhookHandler extends AbstractBigCommerceWebhookHandler {
  async handle(): Promise<unknown> {
    return 0;
  }
}

@Injectable()
@BigcommerceWebhookHandler('products/variants/created')
class TestWebhookHandler2 extends AbstractBigCommerceWebhookHandler {
  async handle(): Promise<unknown> {
    return 0;
  }
}

describe('WebhookHandlerExplorer', () => {
  let provider: WebhookHandlerExplorer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscoveryModule],
      providers: [
        WebhookHandlerExplorer,
        TestWebhookHandler,
        TestWebhookHandler2,
      ],
    }).compile();

    await module.init();

    provider = module.get<WebhookHandlerExplorer>(WebhookHandlerExplorer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('.getWebhookScopeHandler()', () => {
    it('should return handlers if defined', async () => {
      const createdHandlers = provider.getWebhookScopeHandlers(
        'products/variants/created',
      );
      expect(createdHandlers?.length).toEqual(2);

      const updatedHandlers = provider.getWebhookScopeHandlers(
        'products/variants/updated',
      );
      expect(updatedHandlers?.length).toEqual(1);
    });

    it('should return undefined if no handlers are defined for scope', async () => {
      const handlers = provider.getWebhookScopeHandlers(
        'products/variants/nonexistent',
      );
      expect(handlers).not.toBeDefined();
    });
  });
});
