import { axiosInstance } from './axiosInstance';

export function addRecommendation(formData: FormData) {
  return axiosInstance.post('api/v1/place', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
