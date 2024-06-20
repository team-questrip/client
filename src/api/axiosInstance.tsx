import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않음
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/sign-in'; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);
