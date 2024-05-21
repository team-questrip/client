import { useQuery } from '@tanstack/react-query';
import FetchAddress from '../api/FetchAddress';
import fetchPlaceData from '../api/FetchPlace';
import PlaceCard from '../components/PlaceCard';
import { GetPlaceProps } from '../interface/props';

const Home = () => {
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isError: isAddressError,
    error: addressError,
  } = useQuery({
    queryKey: ['address'],
    queryFn: FetchAddress,
  });

  let content;
  let latitude;
  let longitude;

  if (isAddressLoading) {
    content = <div>Loading...</div>;
  }

  if (isAddressError) {
    content = <div>{addressError.message}</div>;
  }

  if (addressData) {
    content = <div>{addressData.address}</div>;
    latitude = addressData.latitude;
    longitude = addressData.longitude;

    localStorage.setItem('latitude', latitude.toString());
    localStorage.setItem('longitude', longitude.toString());
  }

  const {
    data: placeData,
    isLoading: isPlaceLoading,
    isError: isPlaceError,
    error: placeError,
  } = useQuery<GetPlaceProps['data']>({
    queryKey: ['place'],
    queryFn: fetchPlaceData,
    enabled: !!latitude && !!longitude,
  });

  let placeContent;
  if (isPlaceLoading) {
    placeContent = <div>Loading...</div>;
  } else if (isPlaceError) {
    placeContent = <div>{placeError.message}</div>;
  } else if (placeData) {
    placeContent = <PlaceCard placeData={placeData} />;
  }

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
      {placeContent}
    </div>
  );
};

export default Home;
