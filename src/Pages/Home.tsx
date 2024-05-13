import { useQuery } from '@tanstack/react-query';
import FetchAddress from '../api/FetchAddress';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import PlaceCard from '../Components/PlaceCard';

export interface ImagesItem {
  sequence: number;
  url: string;
}

export interface ContentItem {
  activity: string;
  recommendationReason: string;
}

export interface PlaceContentItem {
  content: ContentItem;
  distance: number;
  formattedAddress: string;
  googlePlaceId: string;
  id: string;
  images: ImagesItem[];
  location: string;
  openNow: string;
  openingHours: string[];
  placeName: string;
  primaryType: string;
}

export interface getPlaceProps {
  data: {
    content: PlaceContentItem[];
    hasNext: boolean;
    numberOfElements: number;
    page: number;
    size: number;
  };
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

  const [placeData, setPlaceData] = useState<getPlaceProps | null>(null);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const getPlaceAPI = async () => {
        try {
          const response = await axiosInstance.get(
            `api/v1/place?latitude=${latitude}&longitude=${longitude}&page=0&size=10`
          );
          setPlaceData(response.data);
        } catch (error) {
          console.error('API 요청 중 오류 발생:', error);
        }
      };
      getPlaceAPI();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <div className="text-right">⚙️</div>
      <h1 className="font-bold text-3xl">Questrip</h1>
      <div className="flex justify-between items-center my-5">
        {content}
        <button className="ml-2 bg-mainColor rounded-xl text-center w-20 p-1 cursor-pointer">
          Change
        </button>
      </div>
      <div className="font-semibold pt-1 text-lg">
        Quests conquered<p>by others near you</p>
      </div>
      <PlaceCard placeData={placeData} />
    </div>
  );
};

export default Home;
