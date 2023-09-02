import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { BIGCOMMERCE_WEBHOOK_SCOPE_METADATA } from '../bigcommerce-webhooks.constants';

export const BigcommerceWebhookHandler = (
  scope: string | Array<string>,
): CustomDecorator => {
  const scopes: Array<string> = Array.isArray(scope) ? scope : [scope];
  return SetMetadata(BIGCOMMERCE_WEBHOOK_SCOPE_METADATA, scopes);
};
