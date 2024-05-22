import PlaceData from '../interface/PlaceData';
import { axiosInstance } from './axiosInstance';

const FetchPlaceData = async (): Promise<PlaceData> => {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');

  if (!latitude || !longitude) {
    throw new Error('위치 정보가 없습니다.');
  }

  const response = await axiosInstance.get<PlaceData>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
  );

  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
};

export default FetchPlaceData;
