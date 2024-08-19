import PlaceData from '../interface/placeData';
import { axiosInstance } from './axiosInstance';

const FetchPlaceData = async (
  pageParam: number,
  latitude: number,
  longitude: number
): Promise<PlaceData> => {
  if (latitude === null || longitude === null) {
    throw new Error('위치 정보가 없습니다.');
  }

  const response = await axiosInstance.get<PlaceData>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=${pageParam}&size=10`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
};

export default FetchPlaceData;
