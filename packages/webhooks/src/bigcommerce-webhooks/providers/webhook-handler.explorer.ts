import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveredClass, DiscoveryService } from '@golevelup/nestjs-discovery';
import { BIGCOMMERCE_WEBHOOK_SCOPE_METADATA } from '../bigcommerce-webhooks.constants';
import { AbstractBigCommerceWebhookHandler } from './bigcommerce-webhook-handler';

@Injectable()
export class WebhookHandlerExplorer implements OnModuleInit {
  private readonly _handlers: Map<string, DiscoveredClass> = new Map();

  constructor(private readonly discover: DiscoveryService) {}

  async onModuleInit() {
    const providers = await this.discover.providersWithMetaAtKey<string>(
      BIGCOMMERCE_WEBHOOK_SCOPE_METADATA,
    );

    for (const provider of providers) {
      this._handlers.set(provider.meta, provider.discoveredClass);
    }
  }

  /**
   * Returns the webhook handler instance for the provided scope, if any.
   *
   * @param scope
   */
  getWebhookScopeHandler(
    scope: string,
  ): AbstractBigCommerceWebhookHandler | undefined {
    const handlerClass = this._handlers.get(scope);
    if (!handlerClass) {
      return undefined;
    }
    return handlerClass.instance as AbstractBigCommerceWebhookHandler;
  }
}
