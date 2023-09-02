import { Test, TestingModule } from '@nestjs/testing';
import { AuthProviderService } from './auth-provider.service';
import { BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS } from '../bigcommerce-webhooks.constants';

describe('AuthProviderService', () => {
  let service: AuthProviderService;
  const USERNAME = 'edge';
  const PASSWORD = 'test';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthProviderService,
        {
          provide: BIGCOMMERCE_WEBHOOKS_MODULE_OPTIONS,
          useValue: { auth: { username: USERNAME, password: PASSWORD } },
        },
      ],
    }).compile();

    service = module.get<AuthProviderService>(AuthProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.authEnabled()', () => {
    it('should return the correct authorization status', () => {
      expect(service.authEnabled()).toEqual(true);
    });
  });

  describe('.getAuthorizationHeader()', () => {
    it('should return the return the correct authorization header', () => {
      const header = service.getAuthorizationHeader();
      const token = header.split(' ')[1];

      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      expect(decoded).toEqual(`${USERNAME}:${PASSWORD}`);
    });
  });
});
