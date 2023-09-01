import { Module } from '@nestjs/common';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { BigCommerceCoreOptions } from './bigcommerce-core.interface';
import { BIGCOMMERCE_CORE_OPTIONS } from './bigcommerce-core.constants';
import { BigcommerceCoreService } from './bigcommerce-core.service';

@Module({
  exports: [BigcommerceCoreService],
  providers: [BigcommerceCoreService],
})
export class BigcommerceCoreModule extends createConfigurableDynamicRootModule<
  BigcommerceCoreModule,
  BigCommerceCoreOptions
>(BIGCOMMERCE_CORE_OPTIONS) {
  static deferred = () =>
    BigcommerceCoreModule.externallyConfigured(BigcommerceCoreModule, 0);
}
