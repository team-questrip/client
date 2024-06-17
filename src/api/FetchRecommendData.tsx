import { PlaceRecommendData } from '../interface/PlaceRecommendData';
import { axiosInstance } from './axiosInstance';

const FetchRecommendData = async (
  latitude: number,
  longitude: number
): Promise<PlaceRecommendData> => {
  if (latitude === null || longitude === null) {
    throw new Error('위치 정보가 없습니다.');
  }

  const response = await axiosInstance.get<PlaceRecommendData>(
    `api/v1/recommend?latitude=${latitude}&longitude=${longitude}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_TEST_TOKEN,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
};

export default FetchRecommendData;
