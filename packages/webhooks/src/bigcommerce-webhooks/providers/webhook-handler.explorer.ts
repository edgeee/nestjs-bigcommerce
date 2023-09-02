import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveredClass, DiscoveryService } from '@golevelup/nestjs-discovery';
import { BIGCOMMERCE_WEBHOOK_SCOPE_METADATA } from '../bigcommerce-webhooks.constants';
import { AbstractBigCommerceWebhookHandler } from './bigcommerce-webhook-handler';

@Injectable()
export class WebhookHandlerExplorer implements OnModuleInit {
  private readonly handlers: Map<string, DiscoveredClass> = new Map();

  constructor(private readonly discover: DiscoveryService) {}

  /**
   * Builds the table for scope => webhook handlers.
   */
  async onModuleInit() {
    const providers = await this.discover.providersWithMetaAtKey<string>(
      BIGCOMMERCE_WEBHOOK_SCOPE_METADATA,
    );

    for (const provider of providers) {
      // <scope: discovered class>
      this.handlers.set(provider.meta, provider.discoveredClass);
    }
  }

  /**
   * Returns the webhook handler instance for the provided scope, if any.
   *
   * @param scope
   * @return AbstractBigCommerceWebhookHandler
   */
  getWebhookScopeHandler(
    scope: string,
  ): AbstractBigCommerceWebhookHandler | undefined {
    const handlerClass = this.handlers.get(scope);

    if (!handlerClass) {
      Logger.warn(`Requested handler for unhandled scope: ${scope}`);
    }

    return handlerClass
      ? (handlerClass.instance as AbstractBigCommerceWebhookHandler)
      : undefined;
  }
}
