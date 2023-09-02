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
  async handleWebhookEvent(@Body() payload: WebhookPayloadDto): Promise<void> {
    const handlers = this.webhookHandlerExplorer.getWebhookScopeHandlers(
      payload.scope,
    );

    if (handlers) {
      const event: BigcommerceWebhookEvent<unknown> = {
        scope: payload.scope,
        created_at: payload.created_at,
        store_id: +payload.store_id,
        producer: payload.producer,
        hash: payload.hash,
        data: payload.data,
      };

      for (const handler of handlers) {
        await handler.handle.call(handler, event);
      }
    }
  }
}
