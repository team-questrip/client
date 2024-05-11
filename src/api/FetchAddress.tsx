const FetchAddress = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_Google_API_KEY;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=en`
          )
            .then(response => response.json())
            .then(data => {
              if (data.status === 'OK') {
                const addressData: string = data.results[4].formatted_address;
                const commaIndex = addressData.indexOf(',');
                const secondCommaIndex = addressData.indexOf(
                  ',',
                  commaIndex + 1
                );
                const addressResult = addressData.substring(
                  0,
                  secondCommaIndex
                );

                resolve(addressResult);
              } else {
                reject('주소를 가져오는 데 문제가 발생했습니다.');
              }
            })
            .catch(error => {
              reject(error);
            });
        },
        error => {
          reject('위치 정보를 가져오는 데 문제가 발생했습니다.');
        }
      );
    } else {
      reject('Geolocation을 지원하지 않습니다.');
    }
  });
};

export default FetchAddress;
