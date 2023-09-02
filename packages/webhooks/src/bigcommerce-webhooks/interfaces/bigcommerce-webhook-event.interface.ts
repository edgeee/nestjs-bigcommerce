export interface BigcommerceWebhookEvent<T> {
  scope: string;
  store_id: number;
  data: T;
  hash: string;
  created_at: number;
  producer: string;
}
