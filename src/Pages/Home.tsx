import { useState } from 'react';

const Home = () => {
  const [address, setAddress] = useState('');

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const apiKey = import.meta.env.VITE_Google_API_KEY;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=en`
      )
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK') {
            const addressData = data.results[4].address_components[0].long_name;
            console.log(data);
            setAddress(addressData);
          } else {
            console.log('주소를 가져오는 데 문제가 발생했습니다.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  } else {
    console.log('Geolocation을 지원하지 않습니다.');
  }

  return (
    <div>
      <div className="text-right">⚙️</div>
      <h1 className="font-semibold  text-3xl mb-3">Questrip</h1>
      <div className="flex justify-between items-center">
        <div>{address}</div>
        <button className="ml-2 bg-mainColor rounded-xl text-center w-20 p-1 cursor-pointer">
          Change
        </button>
      </div>
    </div>
  );
};
export default Home;
