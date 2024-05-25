// 위치 정보를 가져오는 함수
const getPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// 주소를 가져오는 함수
const fetchAddress = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const apiKey = import.meta.env.VITE_Google_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=en`
  );
  const data = await response.json();

  if (data.status === 'OK') {
    const addressData: string = data.results[4].formatted_address;
    const commaIndex = addressData.indexOf(',');
    const secondCommaIndex =
      addressData.indexOf(',', commaIndex + 1) ||
      addressData.indexOf(',', commaIndex + 2);
    const addressResult = addressData.substring(0, secondCommaIndex);
    return addressResult;
  } else {
    throw new Error('주소를 가져오는 데 문제가 발생했습니다.');
  }
};

// 주소 정보를 가져오는 함수
const getAddressData = async (
  changedLat?: number,
  changedLng?: number
): Promise<{
  address: string;
  latitude: number;
  longitude: number;
}> => {
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
};

export default getAddressData;
