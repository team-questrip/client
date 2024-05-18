import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import FetchAddress from '../api/FetchAddress';

import PlaceCard from '../components/PlaceCard';

import { setAddressData } from '../store/addressData';
import FetchPlace from '../api/FetchPlace';

const Home = () => {
  const dispatch = useDispatch();

  const { data, isPending, isError, error } = useQuery({
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
    console.log(error);
    content = <div>error</div>;
  }

  if (data) {
    content = <div>{data.address}</div>;
    latitude = data.latitude;
    longitude = data.longitude;

    dispatch(setAddressData({ address: data.address, latitude, longitude }));

    localStorage.setItem('latitude', latitude.toString());
    localStorage.setItem('longitude', longitude.toString());
  }

  const {
    data: placeDatas,
    isPending: placeIsPending,
    isError: placeIsError,
    error: placeError,
  } = useQuery({
    queryKey: ['place'],
    queryFn: FetchPlace,
  });

  if (placeDatas) {
    console.log(placeDatas);
  }

  if (placeIsPending) {
    console.log('pending');
  }

  if (placeIsError) {
    console.log(placeError);
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
      <PlaceCard placeData={placeDatas} />
    </div>
  );
};

export default Home;
