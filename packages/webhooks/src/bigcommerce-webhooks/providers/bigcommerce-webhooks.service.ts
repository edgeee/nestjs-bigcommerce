import { Inject, Injectable } from '@nestjs/common';
import { BigcommerceCoreService, PaginationV3 } from '@nestjs-bigcommerce/core';
import {
  BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS,
  WEBHOOK_CONTROLLER_PATH,
} from '../bigcommerce-webhooks.constants';
import { BigcommerceWebhooksModuleOptions } from '../bigcommerce-webhooks.options';
import {
  AuthorizedStore,
  CreatedWebhookParamsWithDestination,
  CreateWebhookParams,
} from '../interfaces';
import { AuthProviderService } from './auth-provider.service';
import {
  BigCommerceWebhook,
  WebhookResponse,
  WebhookResponseList,
} from '../interfaces/webhook-response.interface';

@Injectable()
export class BigcommerceWebhooksService {
  constructor(
    private readonly bigcommerceCoreService: BigcommerceCoreService,
    @Inject(BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS)
    private readonly webhookModuleOptions: BigcommerceWebhooksModuleOptions,
    private readonly authProviderService: AuthProviderService,
  ) {}

  /**
   * Create a webhook subscription for a given store.
   *
   * @param params
   * @param authorizedStore
   * @param useAuth
   * @returns BigCommerceWebhook
   */
  async createWebhook(
    params: CreateWebhookParams,
    authorizedStore: AuthorizedStore,
    useAuth = true,
  ): Promise<BigCommerceWebhook | undefined> {
    const httpClient = this.bigcommerceCoreService.getV3HttpClient(
      authorizedStore.accessToken,
      authorizedStore.storeHash,
    );

    try {
      const response = await httpClient.post<WebhookResponse>(
        'hooks',
        this._makeCreateWebhookParams(params, useAuth),
      );
      return response.data.data;
    } catch (error: unknown) {
      this._handleApiError(error);
    }
    return undefined;
  }

  async updateWebhook(
    webhookId: number,
    authorizedStore: AuthorizedStore,
    params: CreateWebhookParams,
    useAuth: boolean,
  ): Promise<BigCommerceWebhook | undefined> {
    const httpClient = this.bigcommerceCoreService.getV3HttpClient(
      authorizedStore.accessToken,
      authorizedStore.storeHash,
    );

    try {
      const response = await httpClient.put<WebhookResponse>(
        `hooks/${webhookId}`,
        this._makeCreateWebhookParams(params, useAuth),
      );
      return response.data.data;
    } catch (error: unknown) {
      this._handleApiError(error);
    }

    return undefined;
  }

  /**
   * Deletes a webhook subscription for a store.
   *
   * @param webhookId
   * @param authorizedStore
   * @returns BigCommerceWebhook
   */
  async deleteWebhook(
    webhookId: number,
    authorizedStore: AuthorizedStore,
  ): Promise<BigCommerceWebhook | undefined> {
    const httpClient = this.bigcommerceCoreService.getV3HttpClient(
      authorizedStore.accessToken,
      authorizedStore.storeHash,
    );

    try {
      const response = await httpClient.delete<WebhookResponse>(
        `hooks/${webhookId}`,
      );
      return response.data.data;
    } catch (error: unknown) {
      this._handleApiError(error);
    }

    return undefined;
  }

  /**
   * Get a webhook subscription for a store by ID.
   *
   * @param webhookId
   * @param authorizedStore
   */
  async getWebhook(
    webhookId: number,
    authorizedStore: AuthorizedStore,
  ): Promise<BigCommerceWebhook | undefined> {
    const httpClient = this.bigcommerceCoreService.getV3HttpClient(
      authorizedStore.accessToken,
      authorizedStore.storeHash,
    );

    try {
      const response = await httpClient.get<WebhookResponse>(
        `hooks/${webhookId}`,
      );
      return response.data.data;
    } catch (error: unknown) {
      this._handleApiError(error);
    }
    return undefined;
  }

  /**
   * List all webhook subscriptions for a store.
   *
   * @param authorizedStore
   * @param params
   */
  async listWebhooks(
    authorizedStore: AuthorizedStore,
    params?: {
      page?: number;
      limit?: number;
      is_active?: boolean;
      scope?: string;
    },
  ): Promise<[Array<BigCommerceWebhook>, PaginationV3] | undefined> {
    params = params || {};

    const httpClient = this.bigcommerceCoreService.getV3HttpClient(
      authorizedStore.accessToken,
      authorizedStore.storeHash,
    );

    try {
      const response = await httpClient.get<WebhookResponseList>('hooks', {
        params,
      });
      return [response.data.data, response.data.meta.pagination];
    } catch (error: unknown) {
      this._handleApiError(error);
    }
    return undefined;
  }

  private _makeCreateWebhookParams(
    params: CreateWebhookParams,
    useAuth: boolean,
  ): CreatedWebhookParamsWithDestination {
    const paramsWithDestination = {
      ...params,
      destination: this.webhookDestinationUrl,
    };

    paramsWithDestination.headers = params.headers || {};

    if (useAuth && this.authProviderService.authEnabled()) {
      paramsWithDestination.headers['Authorization'] =
        this.authProviderService.getAuthorizationHeader();
    }
    return paramsWithDestination;
  }

  private _handleApiError(error: unknown) {
    throw error;
  }

  /**
   * Returns the FQDN webhook destination url.
   */
  get webhookDestinationUrl() {
    return `https://${this.webhookModuleOptions.appHost}/${WEBHOOK_CONTROLLER_PATH}`;
  }
}
