export interface BigcommerceWebhookEvent<T> {
  scope: string;
  storeId: number;
  data: T;
  hash: string;
  createdAt: Date;
  producer: string;
}
