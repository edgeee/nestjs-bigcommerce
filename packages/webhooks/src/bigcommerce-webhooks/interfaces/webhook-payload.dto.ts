export type WebhookPayloadDto = {
  store_id: number;
  producer: string;
  scope: string;
  data: unknown;
  hash: string;
  created_at: number;
};
