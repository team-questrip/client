import { SignUpData } from '../interface/user';
import { axiosInstance } from './axiosInstance';

export function checkEmail(email: string) {
  return axiosInstance.post('api/v1/user/checkEmail', {
    email,
  });
}

export function join(signUpData: SignUpData) {
  return axiosInstance.post('api/v1/user/join', signUpData);
}
