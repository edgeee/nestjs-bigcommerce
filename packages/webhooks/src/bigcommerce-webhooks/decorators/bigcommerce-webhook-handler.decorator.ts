import { SetMetadata } from '@nestjs/common';
import { BIGCOMMERCE_WEBHOOK_SCOPE_METADATA } from '../bigcommerce-webhooks.constants';

export const BigcommerceWebhookHandler = (scope: string) =>
  SetMetadata(BIGCOMMERCE_WEBHOOK_SCOPE_METADATA, scope);
