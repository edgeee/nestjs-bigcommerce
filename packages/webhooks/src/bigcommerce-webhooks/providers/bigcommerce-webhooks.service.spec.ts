import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceWebhooksService } from './bigcommerce-webhooks.service';
import { AuthProviderService } from './auth-provider.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS } from '../bigcommerce-webhooks.constants';
import { BigcommerceWebhookAuth } from '../bigcommerce-webhooks.options';

const moduleMocker = new ModuleMocker(global);

describe('BigcommerceWebhooksService', () => {
  let service: BigcommerceWebhooksService;
  const authUser = 'test-user';
  const authPassword = 'test-password';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BigcommerceWebhooksService,
        { provide: AuthProviderService, useValue: {} },
      ],
    })
      .useMocker((token) => {
        if (token === AuthProviderService) {
          return {
            authEnabled: () => true,
            getAuthorizationHeader: (): string =>
              Buffer.from(authUser + ':' + authPassword).toString('base64'),
          };
        }

        if (token === BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS) {
          return {
            auth: {
              username: authUser,
              password: authPassword,
            } as BigcommerceWebhookAuth,
            appHost: 'app.local',
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<BigcommerceWebhooksService>(
      BigcommerceWebhooksService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
