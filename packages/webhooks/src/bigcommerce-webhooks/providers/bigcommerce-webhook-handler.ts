import { BigcommerceWebhookEvent } from '../interfaces';

export abstract class AbstractBigCommerceWebhookHandler {
  abstract handle(event: BigcommerceWebhookEvent<unknown>): Promise<unknown>;
}
