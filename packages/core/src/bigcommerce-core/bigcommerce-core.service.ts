import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { BIGCOMMERCE_CORE_OPTIONS } from './bigcommerce-core.constants';
import { BigCommerceCoreOptions } from './bigcommerce-core.interface';
import * as BigCommerce from '@bigcommerce/api-nodejs';

@Injectable()
export class BigcommerceCoreService {
  constructor(
    @Inject(BIGCOMMERCE_CORE_OPTIONS)
    private readonly clientOptions: BigCommerceCoreOptions,
  ) {}

  /**
   * Returns a REST client for a store that be used to perform API requests for that store.
   *
   * @param accessToken
   * @param storeHash
   * @returns RestClient
   */
  getRestClient(accessToken: string, storeHash: string) {
    return new BigCommerce.Rest({
      storeHash: storeHash,
      accessToken: accessToken,
    });
  }

  /**
   * Returns a client that can be used to perform OAuth functions.
   *
   * @param authCallback
   * @param loginHost
   * @returns OAuth
   */
  getAuthClient(authCallback: string, loginHost?: string) {
    return new BigCommerce.Auth({
      clientId: this.clientOptions.clientId,
      clientSecret: this.clientOptions.clientSecret,
      authCallback: authCallback,
      loginHost: loginHost,
    });
  }

  /**
   * Returns an HTTP client that can be used to perform V2 API requests.
   *
   * Returns an axios instance. See https://axios-http.com/docs/instance
   *
   * This is necessary since the default API client from BigCommerce is not fully complete.
   *
   * @param accessToken
   * @param storeHash
   */
  getV2HttpClient(accessToken: string, storeHash: string): AxiosInstance {
    return this._makeHttpClient(accessToken, storeHash, 'v2');
  }

  /**
   * Returns an HTTP client that can be used to perform V3 API requests.
   *
   * Returns an axios instance. See https://axios-http.com/docs/instance
   *
   * This is necessary since the default API client from BigCommerce is not fully complete.
   *
   * @param accessToken
   * @param storeHash
   */
  getV3HttpClient(accessToken: string, storeHash: string): AxiosInstance {
    return this._makeHttpClient(accessToken, storeHash, 'v3');
  }

  private _makeHttpClient(
    accessToken: string,
    storeHash: string,
    version: 'v2' | 'v3',
  ): AxiosInstance {
    const baseURL = `https://api.bigcommerce.com/stores/${storeHash}/${version}`;
    return axios.create({
      baseURL: baseURL,
      headers: {
        'X-Auth-Token': accessToken,
        Accept: 'application/json',
      },
    });
  }
}
