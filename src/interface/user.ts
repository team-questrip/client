export interface AuthenticationData {
  username: string;
  email: string;
  password: string;
}

export interface AuthenticationResponseData {
  accessToken: string;
  user: UserInfo;
}

export interface UserInfo {
  username: string;
  email: string;
  [key: string]: unknown;
}
