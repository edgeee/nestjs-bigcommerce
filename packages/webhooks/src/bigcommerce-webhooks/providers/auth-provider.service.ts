import { Inject, Injectable } from '@nestjs/common';
import { BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS } from '../bigcommerce-webhooks.constants';
import {
  BigcommerceWebhookAuth,
  BigcommerceWebhooksModuleOptions,
} from '../bigcommerce-webhooks.options';

@Injectable()
export class AuthProviderService {
  constructor(
    @Inject(BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS)
    private readonly webhookModuleOptions: BigcommerceWebhooksModuleOptions,
  ) {}

  authEnabled(): boolean {
    return !!this.webhookModuleOptions.auth;
  }

  getAuthorizationHeader(): string {
    if (!this.authEnabled()) {
      throw new Error(`Auth not enabled`);
    }

    const auth = this.webhookModuleOptions.auth as BigcommerceWebhookAuth;

    const encodedAuthHeader = Buffer.from(
      auth.username + ':' + auth.password,
    ).toString('base64');
    return `Basic ${encodedAuthHeader}`;
  }
}
