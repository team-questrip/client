import { PlaceDetailData } from '../interface/placeDetailData';
import { axiosInstance } from './axiosInstance';

async function fetchPlaceDetail({
  placeId,
}: {
  placeId: string;
}): Promise<PlaceDetailData> {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');

  const response = await axiosInstance.get<PlaceDetailData>(
    `api/v1/place/${placeId}?latitude=${latitude}&longitude=${longitude}`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
}
export default fetchPlaceDetail;
