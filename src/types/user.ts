export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export type AuthenticationData = Omit<UserRegistrationData, 'username'>;

export interface AuthenticationResponseData {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface UserInfo {
  username: string;
  email: string;
  [key: string]: unknown;
}
