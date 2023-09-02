import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceWebhooksController } from './bigcommerce-webhooks.controller';
import { WebhookHandlerExplorer } from '../providers/webhook-handler.explorer';
import { AbstractBigCommerceWebhookHandler } from '../providers/bigcommerce-webhook-handler';
import { BigcommerceWebhookEvent, WebhookPayloadDto } from '../interfaces';

class TestWebhookHandler extends AbstractBigCommerceWebhookHandler {
  async handle(event: BigcommerceWebhookEvent<unknown>): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}

const CreatedEventScope = 'product/variants/created';

describe('BigcommerceWebhooksController', () => {
  let controller: BigcommerceWebhooksController;

  const handlerInstance = new TestWebhookHandler();
  const scopeMap: Record<string, Array<AbstractBigCommerceWebhookHandler>> = {
    [CreatedEventScope]: [handlerInstance],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WebhookHandlerExplorer,
          useValue: {
            getWebhookScopeHandlers: (scope: string) => {
              return scopeMap[scope];
            },
          },
        },
      ],
      controllers: [BigcommerceWebhooksController],
    }).compile();

    controller = module.get<BigcommerceWebhooksController>(
      BigcommerceWebhooksController,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.handleWebhookEvent()', () => {
    const event: WebhookPayloadDto = {
      scope: CreatedEventScope,
      store_id: 1234,
      producer: 'test-store',
      data: { id: 1, name: 'product' },
      hash: 'product-1-created',
      created_at: 1223443,
    };

    it('should handle event with handlers', async () => {
      const spy = jest.spyOn(handlerInstance, 'handle');
      await controller.handleWebhookEvent(event);
      expect(spy).toHaveBeenCalledWith(event);
    });

    it('should drop event if no registered handlers', async () => {
      const spy = jest.spyOn(handlerInstance, 'handle');
      event.scope = 'products/variant/nonexistent';

      await controller.handleWebhookEvent(event);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
