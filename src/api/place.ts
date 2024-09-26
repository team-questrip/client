import { UserCurrentPosition } from '../types/current-position';
import { PlaceData, PlaceDetailData } from '../types/place';
import { axiosInstance } from './axiosInstance';

export async function fetchPlaceDataByPage(
  pageParam: number,
  latitude: number,
  longitude: number,
  category?: string | null
): Promise<PlaceData> {
  if (latitude === null || longitude === null) {
    throw new Error('위치 정보가 없습니다.');
  }

  const response = await axiosInstance.get<PlaceData>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=${pageParam}&size=10&category=${
      category ? category : ''
    }`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
}

export async function fetchPlaces(latitude: number, longitude: number) {
  const response = await axiosInstance.get<PlaceData>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
  );

  return response.data.data.content;
}

export async function fetchPlaceDetail({
  placeId,
  userCurrentPosition,
}: {
  placeId?: string;
  userCurrentPosition?: UserCurrentPosition | null;
}): Promise<PlaceDetailData | void> {
  if (!placeId || !userCurrentPosition) return;
  const { latitude, longitude } = userCurrentPosition;

  const response = await axiosInstance.get<PlaceDetailData>(
    `api/v1/place/${placeId}?latitude=${latitude}&longitude=${longitude}`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
}
