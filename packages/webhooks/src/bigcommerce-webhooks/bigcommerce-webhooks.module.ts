import { Module } from '@nestjs/common';
import { WebhookHandlerExplorer } from './providers/webhook-handler.explorer';
import { BigcommerceWebhooksController } from './controllers/bigcommerce-webhooks.controller';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { BigcommerceWebhooksModuleOptions } from './bigcommerce-webhooks.options';
import { BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS } from './bigcommerce-webhooks.constants';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { BigcommerceWebhooksService } from './providers/bigcommerce-webhooks.service';
import { AuthProviderService } from './providers/auth-provider.service';

@Module({
  imports: [DiscoveryModule],
  providers: [
    WebhookHandlerExplorer,
    BigcommerceWebhooksService,
    AuthProviderService,
  ],
  exports: [BigcommerceWebhooksService],
  controllers: [BigcommerceWebhooksController],
})
export class BigcommerceWebhooksModule extends createConfigurableDynamicRootModule<
  BigcommerceWebhooksModule,
  BigcommerceWebhooksModuleOptions
>(BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS) {
  static deferred = () =>
    BigcommerceWebhooksModule.externallyConfigured(
      BigcommerceWebhooksModule,
      0,
    );
}
