import { AxiosResponse } from 'axios';
import { AuthenticationData, AuthenticationResponseData } from '../types/user';
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
  signUpData: AuthenticationData
): Promise<AxiosResponse<APIResponse<AuthenticationResponseData>>> {
  return axiosInstance.post('/api/v1/user/join', signUpData);
}

export function login(
  signInData: Omit<AuthenticationData, 'username'>
): Promise<AxiosResponse<APIResponse<AuthenticationResponseData>>> {
  return axiosInstance.post('api/v1/user/login', signInData);
}
