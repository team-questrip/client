import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import FetchAddress from '../api/FetchAddress';
import FetchPlaceData from '../api/FetchPlaceData';
import PlaceCard from '../components/PlaceCard';
import { IoMdSettings } from 'react-icons/io';

const Home = () => {
  const handleSetting = () => {
    alert('개발중입니다. 조금만 기다려주세요!');
  };

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
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['place'],
    queryFn: ({ pageParam }) => FetchPlaceData(pageParam),
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
        <button className="ml-2 bg-mainColor rounded-xl text-center w-20 p-1 cursor-pointer hover:scale-105">
          Change
        </button>
      </div>
      {placeContent}
      <div ref={observerRef} />
    </div>
  );
};

export default Home;
