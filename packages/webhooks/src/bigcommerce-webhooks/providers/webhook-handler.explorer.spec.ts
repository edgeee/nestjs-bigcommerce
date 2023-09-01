import { Test, TestingModule } from '@nestjs/testing';
import { WebhookHandlerExplorer } from './webhook-handler.explorer';

describe('WebhookHandlerExplorer', () => {
  let provider: WebhookHandlerExplorer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookHandlerExplorer],
    }).compile();

    provider = module.get<WebhookHandlerExplorer>(WebhookHandlerExplorer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
