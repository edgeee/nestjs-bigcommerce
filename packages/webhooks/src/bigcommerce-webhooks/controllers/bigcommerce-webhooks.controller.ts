import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { WebhookHandlerExplorer } from '../providers/webhook-handler.explorer';
import { BigcommerceWebhookEvent, WebhookPayloadDto } from '../interfaces';
import { WEBHOOK_CONTROLLER_PATH } from '../bigcommerce-webhooks.constants';

@Controller(WEBHOOK_CONTROLLER_PATH)
export class BigcommerceWebhooksController {
  constructor(
    private readonly webhookHandlerExplorer: WebhookHandlerExplorer,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() payload: WebhookPayloadDto): Promise<void> {
    const handler = this.webhookHandlerExplorer.getWebhookScopeHandler(
      payload.scope,
    );

    if (handler) {
      const event: BigcommerceWebhookEvent<unknown> = {
        scope: payload.scope,
        createdAt: new Date(payload.created_at),
        storeId: +payload.store_id,
        producer: payload.producer,
        hash: payload.hash,
        data: payload.data,
      };

      await handler.handle.call(handler, event);
    }
  }
}
