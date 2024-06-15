import { AuthenticationData } from '../interface/user';
import { axiosInstance } from './axiosInstance';

export function checkEmail(email: string) {
  return axiosInstance.post('api/v1/user/checkEmail', {
    email,
  });
}

export function join(signUpData: AuthenticationData) {
  return axiosInstance.post('api/v1/user/join', signUpData);
}

export function login(signInData: Omit<AuthenticationData, 'username'>) {
  return axiosInstance.post('api/v1/user/login', signInData);
}
