import { useQuery } from '@tanstack/react-query';
import FetchAddress from '../api/FetchAddress';
import { useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

interface getPlaceProps {
  data: object;
  message: string;
  status: string;
}

const Home = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['address'],
    queryFn: FetchAddress,
  });

  let content;
  let latitude: number = 0;
  let longitude: number = 0;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>error</div>;
  }

  if (data) {
    content = <div>{data.address}</div>;
    latitude = data.latitude;
    longitude = data.longitude;
  }

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const getPlaceAPI = async () => {
        try {
          const response = await axiosInstance.get(
            `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
          );
          getPlace(response.data);
        } catch (error) {
          console.error('API 요청 중 오류 발생:', error);
        }
      };
      getPlaceAPI();
    }
  }, [latitude, longitude]);

  const getPlace = (data: getPlaceProps) => {
    console.log(data);
  };

  return (
    <div>
      <div className="text-right">⚙️</div>
      <h1 className="font-semibold text-3xl mb-3">Questrip</h1>
      <div className="flex justify-between items-center">
        {content}
        <button className="ml-2 bg-mainColor rounded-xl text-center w-20 p-1 cursor-pointer">
          Change
        </button>
      </div>
    </div>
  );
};

export default Home;
