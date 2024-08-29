import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { APIErrorResponse } from '../types/api';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface CustomInternalAxiosRequestConfig<D>
  extends InternalAxiosRequestConfig<D> {
  _retry?: boolean;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<APIErrorResponse, unknown>) => {
    const originalRequest = error.config as
      | CustomInternalAxiosRequestConfig<unknown>
      | undefined;
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      // 토큰이 만료되었거나 유효하지 않음
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const { data } = await axios.post('api/v1/user/reissue', {
          token: refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance<unknown, AxiosResponse<unknown, unknown>, unknown>(
          originalRequest
        );
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
      }
    }
    return Promise.reject(error);
  }
);
