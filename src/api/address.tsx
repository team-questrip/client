import { Address } from '../types/place';
import { axiosInstance } from './axiosInstance';

// 주소 정보를 가져오는 함수
async function getAddressData(
  changedLat?: number,
  changedLng?: number
): Promise<{
  address: Address;
  latitude: number;
  longitude: number;
}> {
  let latitude: number;
  let longitude: number;

  if (changedLat && changedLng) {
    latitude = changedLat;
    longitude = changedLng;
  } else {
    // 변경된 위도와 경도가 없는 경우 현재 위치를 가져옴
    const position = await getPosition();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  }

  // 위도와 경도를 사용하여 주소를 가져옴
  const address = await fetchAddress(latitude, longitude);
  return { address, latitude, longitude };
}

// 위치 정보를 가져오는 함수
function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 주소를 가져오는 함수
async function fetchAddress(
  latitude: number,
  longitude: number
): Promise<Address> {
  const response = await axiosInstance.get(
    `/api/v1/place/reverseGeocode?latitude=${latitude}&longitude=${longitude}`
  );

  if (response.data.status === 'SUCCESS') {
    return response.data;
  } else {
    throw new Error('주소를 가져오는 데 문제가 발생했습니다.');
  }
}

export default getAddressData;
