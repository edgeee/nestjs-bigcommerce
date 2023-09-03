import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceAuthService } from './bigcommerce-auth.service';
import { BIGCOMMERCE_AUTH_MODULE_OPTIONS } from './bigcommerce-auth.constants';
import { BigcommerceAuthModuleOptions } from './interfaces';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('BigcommerceAuthService', () => {
  let service: BigcommerceAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigcommerceAuthService],
    })
      .useMocker((token) => {
        if (token === BIGCOMMERCE_AUTH_MODULE_OPTIONS) {
          return {
            appHost: 'app.local',
            callbackUrlPath: '/callback',
          } as BigcommerceAuthModuleOptions;
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

    service = module.get<BigcommerceAuthService>(BigcommerceAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
