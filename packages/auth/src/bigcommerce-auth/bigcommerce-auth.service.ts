import { Inject, Injectable } from '@nestjs/common';
import { BigcommerceCoreService } from '@nestjs-bigcommerce/core';
import { AuthCallbackQueryParams } from './interfaces';
import { BIGCOMMERCE_AUTH_MODULE_OPTIONS } from './bigcommerce-auth.constants';
import { BigcommerceAuthModuleOptions } from './interfaces';
import {
  AuthResponsePayload,
  JwtResponsePayload,
} from './auth-response-payload.types';
import { InvalidJwtTokenException } from './bigcommerce-auth.exceptions';

@Injectable()
export class BigcommerceAuthService {
  constructor(
    @Inject(BIGCOMMERCE_AUTH_MODULE_OPTIONS)
    private readonly authOptions: BigcommerceAuthModuleOptions,
    private readonly bigcommerceCoreService: BigcommerceCoreService,
  ) {}

  /**
   * Handles the oauth callback after installation. See
   * https://developer.bigcommerce.com/api-docs/apps/guide/auth#requesting-the-access_token
   *
   * @param queryParams
   * @return authorizedStore
   */
  async authorizeAuthCallbackRequest(
    queryParams: any,
  ): Promise<AuthResponsePayload> {
    const params = queryParams as AuthCallbackQueryParams;
    const payload = await this._authClient.authorize(params);

    return {
      id: payload.user.id,
      email: payload.user.email,
      accessToken: payload.access_token,
      context: payload.context,
      scope: payload.scope.split(/\s+/),
      username: payload.user.username,
    };
  }

  /**
   * Verifies the JWT available in the /load request from Big-Commerce. See
   * https://developer.bigcommerce.com/api-docs/apps/guide/callbacks#decode-and-verify-signed_payload_jwt
   * @param queryParams
   */
  async verifyJwtPayload(queryParams: any): Promise<JwtResponsePayload> {
    const params = queryParams as { signed_payload_jwt: string };

    let userData;
    try {
      userData = await this._authClient.verifyJWT(params.signed_payload_jwt);
    } catch (exc: unknown) {
      throw new InvalidJwtTokenException(`JWT Payload verification failed`);
    }

    return {
      id: userData.user,
      email: userData.user.email,
      locale: userData.user.local,
    };
  }

  private get _authClient() {
    const callbackUrl =
      `${this.authOptions.appHost}/${this.authOptions.callbackUrlPath}`.replace(
        '//',
        '/',
      );

    return this.bigcommerceCoreService.getAuthClient(`https://${callbackUrl}`);
  }
}
