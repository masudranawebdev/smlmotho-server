export type ILoginData = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refeshToken?: string;
};

export type IRefeshTokenResponse = {
  accessToken: string;
};
