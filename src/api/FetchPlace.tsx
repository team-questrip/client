import { axiosInstance } from './axiosInstance';

const fetchPlaceData = async () => {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');

  try {
    const response = await axiosInstance.get(
      `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

export default fetchPlaceData;
