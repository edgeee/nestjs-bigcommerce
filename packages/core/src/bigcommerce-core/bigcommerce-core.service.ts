import { Injectable, Inject } from '@nestjs/common';
import { BIGCOMMERCE_CORE_OPTIONS } from './bigcommerce-core.constants';
import { BigCommerceCoreOptions } from './bigcommerce-core.interface';
import * as BigCommerce from '@bigcommerce/api-nodejs';

@Injectable()
export class BigcommerceCoreService {
  constructor(
    @Inject(BIGCOMMERCE_CORE_OPTIONS)
    private readonly clientOptions: BigCommerceCoreOptions,
  ) {}

  getRestClient(accessToken: string, storeHash: string) {
    return new BigCommerce.Rest({
      storeHash: storeHash,
      accessToken: accessToken,
    });
  }

  getAuthClient(authCallback: string, loginHost?: string) {
    return new BigCommerce.Auth({
      clientId: this.clientOptions.clientId,
      clientSecret: this.clientOptions.clientSecret,
      authCallback: authCallback,
      loginHost: loginHost,
    });
  }
}
