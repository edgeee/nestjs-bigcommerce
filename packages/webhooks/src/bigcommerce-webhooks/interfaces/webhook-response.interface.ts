import { V3ApiResponseData } from '@nestjs-bigcommerce/core';

export type BigCommerceWebhook = {
  id: number;
  client_id: string;
  store_hash: string;
  created_at: number;
  updated_at: number;
  scope: number;
  destination: number;
  is_active: boolean;
  headers: Record<string, unknown>;
};

export type WebhookResponse = V3ApiResponseData<BigCommerceWebhook>;

export type WebhookResponseList = V3ApiResponseData<Array<BigCommerceWebhook>>;
