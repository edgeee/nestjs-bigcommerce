import { Module } from '@nestjs/common';
import { BigcommerceAuthService } from './bigcommerce-auth.service';
import { BigcommerceCoreModule } from '@nestjs-bigcommerce/core';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { BigcommerceAuthModuleOptions } from './interfaces/bigcommerce-auth-module-options.interface';
import { BIGCOMMERCE_AUTH_MODULE_OPTIONS } from './bigcommerce-auth.constants';

@Module({
  providers: [BigcommerceAuthService],
  exports: [BigcommerceAuthService],
  imports: [BigcommerceCoreModule.deferred()],
})
export class BigcommerceAuthModule extends createConfigurableDynamicRootModule<
  BigcommerceCoreModule,
  BigcommerceAuthModuleOptions
>(BIGCOMMERCE_AUTH_MODULE_OPTIONS) {
  static deferred = () =>
    BigcommerceAuthModule.externallyConfigured(BigcommerceAuthModule, 0);
}
