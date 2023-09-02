export interface CreateWebhookParams {
  scope: string;
  is_active?: string;
  event_history_enabled?: string;
  headers?: Record<string, unknown>;
}

export interface CreatedWebhookParamsWithDestination
  extends CreateWebhookParams {
  destination: string;
}
