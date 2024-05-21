import { GetPlaceProps } from '../interface/props';
import { axiosInstance } from './axiosInstance';

const fetchPlaceData = async (): Promise<GetPlaceProps['data']> => {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');

  if (!latitude || !longitude) {
    throw new Error('위치 정보가 없습니다.');
  }

  const response = await axiosInstance.get<GetPlaceProps>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
  );

  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error('Unexpected response status');
  }
};

export default fetchPlaceData;
