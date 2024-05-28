import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import FetchPlaceData from '../api/FetchPlaceData';
import PlaceCard from '../components/PlaceCard';
import { IoMdSettings } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import getAddressData from '../api/FetchAddress';

const Home = () => {
  const handleSetting = () => {
    alert('개발중입니다. 조금만 기다려주세요!');
  };

  const navigate = useNavigate();

  const handleGoToSearchLocation = () => {
    navigate('/location-search');
  };

  let content;
  let latitude: number = 0;
  let longitude: number = 0;

  const location = useLocation();

  const changedLatitude = location?.state?.location?.lat || undefined;
  const changedLongitude = location?.state?.location?.lng || undefined;

  const {
    data: addressData,
    isLoading: isAddressLoading,
    isError: isAddressError,
    error: addressError,
  } = useQuery({
    queryKey: ['address', location.state],
    queryFn: () => getAddressData(changedLatitude, changedLongitude),
  });

  if (isAddressLoading) {
    content = <div>Loading...</div>;
  }

  if (isAddressError) {
    content = <div>{addressError.message}</div>;
  }

  if (addressData) {
    content = <div>{addressData.address.data.formattedAddress}</div>;
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
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'place',
      localStorage.getItem('latitude'),
      localStorage.getItem('longitude'),
    ],
    queryFn: ({ pageParam }) => FetchPlaceData(pageParam, latitude, longitude),
    enabled: !!latitude && !!longitude,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? allPages.length : undefined;
    },
  });

  let placeContent;
  if (isPlaceLoading) {
    placeContent = <div>Loading...</div>;
  } else if (isPlaceError) {
    placeContent = <div>{placeError.message}</div>;
  } else if (placeData) {
    placeContent = (
      <div>
        <div className="font-semibold pt-1 text-lg">
          Quests conquered<p>by others near you</p>
        </div>
        {placeData.pages.map((page, index) => (
          <PlaceCard key={index} placeData={page} />
        ))}
      </div>
    );
  }

  const observerRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(observerCallback, {
        threshold: 1.0,
      });
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [observerRef, observerCallback]);

  return (
    <div>
      <div className="flex">
        <IoMdSettings
          className="cursor-pointer size-6 ml-auto hover:scale-125"
          onClick={handleSetting}
        />
      </div>
      <h1 className="font-bold text-3xl">Questrip</h1>
      <div className="flex justify-between items-center my-5">
        {content}
        <button
          className=" bg-mainColor rounded-full text-center w-20 p-2 cursor-pointer hover:scale-105"
          onClick={handleGoToSearchLocation}
        >
          Change
        </button>
      </div>
      {placeContent}
      <div ref={observerRef} />
    </div>
  );
};

export default Home;
