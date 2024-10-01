import { AxiosResponse } from 'axios';
import {
  UserRegistrationData,
  AuthenticationResponseData,
} from '../types/user';
import { axiosInstance } from './axiosInstance';
import { APIResponse } from '../types/api';

export function checkEmail(
  email: string
): Promise<AxiosResponse<APIResponse<null>>> {
  return axiosInstance
    .post('api/v1/user/checkEmail', {
      email,
    })
    .catch(() => {
      throw new Error('Duplicate email.');
    });
}

export function join(
  signUpData: UserRegistrationData
): Promise<AxiosResponse<APIResponse<AuthenticationResponseData>>> {
  return axiosInstance.post('api/v1/user/join', signUpData);
}

export function login(
  signInData: Omit<UserRegistrationData, 'username'>
): Promise<AxiosResponse<APIResponse<AuthenticationResponseData>>> {
  return axiosInstance.post('api/v1/user/login', signInData);
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
}
