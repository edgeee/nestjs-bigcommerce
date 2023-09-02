export type BigcommerceWebhookAuth = {
  username: string;
  password: string;
};

export type BigcommerceWebhooksModuleOptions = {
  auth?: BigcommerceWebhookAuth;
  appHost: string;
};
