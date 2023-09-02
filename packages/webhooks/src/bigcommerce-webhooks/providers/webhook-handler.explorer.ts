import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveredClass, DiscoveryService } from '@golevelup/nestjs-discovery';
import { BIGCOMMERCE_WEBHOOK_SCOPE_METADATA } from '../bigcommerce-webhooks.constants';
import { AbstractBigCommerceWebhookHandler } from './bigcommerce-webhook-handler';

@Injectable()
export class WebhookHandlerExplorer implements OnModuleInit {
  private readonly handlers: Map<string, Array<DiscoveredClass>> = new Map();

  constructor(private readonly discover: DiscoveryService) {}

  /**
   * Builds the map table for scope => webhook handlers.
   */
  async onModuleInit() {
    const providers = await this.discover.providersWithMetaAtKey<Array<string>>(
      BIGCOMMERCE_WEBHOOK_SCOPE_METADATA,
    );

    for (const provider of providers) {
      // <scope: [discovered classes]>
      const scopes = provider.meta;

      for (const scope of scopes) {
        const scopeHandlers = this.handlers.get(scope) || [];
        scopeHandlers.push(provider.discoveredClass);
        this.handlers.set(scope, scopeHandlers);
      }
    }
  }

  /**
   * Returns the webhook handler instance for the provided scope, if any.
   *
   * @param scope
   * @return AbstractBigCommerceWebhookHandler
   */
  getWebhookScopeHandlers(
    scope: string,
  ): Array<AbstractBigCommerceWebhookHandler> | undefined {
    const handlerClasses = this.handlers.get(scope);

    if (!handlerClasses) {
      Logger.warn(`Requested handler for unhandled scope: ${scope}`);
    }

    return handlerClasses
      ? (handlerClasses.map(
          (handlerClass) => handlerClass.instance,
        ) as Array<AbstractBigCommerceWebhookHandler>)
      : undefined;
  }
}
