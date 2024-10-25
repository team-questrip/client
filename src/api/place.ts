import { placeDataSchema, placeDetailDataSchema } from '../schema/placeSchema';
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

  placeDataSchema.parse(response.data);

  return response.data;
}

export async function fetchPlaces(latitude: number, longitude: number) {
  const response = await axiosInstance.get<PlaceData>(
    `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
  );

  placeDataSchema.parse(response.data);

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

  placeDetailDataSchema.parse(response.data);

  return response.data;
}
