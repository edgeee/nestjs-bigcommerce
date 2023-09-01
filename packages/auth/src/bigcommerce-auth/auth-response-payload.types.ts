export type AuthResponsePayload = {
  id: number;
  email: string;
  accessToken: string;
  scope: Array<string>;
  username: string;
  context: string;
};

export type JwtResponsePayload = {
  id: number;
  email: string;
  locale: string;
};
