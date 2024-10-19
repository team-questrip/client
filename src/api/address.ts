import { addressSchema } from '../schema/addressSchema';
import { Address } from '../types/address';
import { axiosInstance } from './axiosInstance';

export function getUserCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
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
