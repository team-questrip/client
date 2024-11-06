import { addressSchema } from '../schema/addressSchema';
import { Address } from '../types/address';
import { axiosInstance } from './axiosInstance';

function getUserCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function requestUserPosition(
  onSuccess: (position: GeolocationPosition) => void,
  onDenied?: (error: GeolocationPositionError) => void
) {
  return getUserCurrentPosition()
    .then((position) => onSuccess(position))
    .catch((error) => {
      const errorObj = error as GeolocationPositionError;
      onDenied?.(errorObj);
    });
}
// 주소를 가져오는 함수
export async function fetchAddress(
  latitude: number,
  longitude: number
): Promise<Address> {
  const response = await axiosInstance.get(
    `/api/v1/place/reverseGeocode?latitude=${latitude}&longitude=${longitude}`
  );

  addressSchema.parse(response.data);

  return response.data;
}
