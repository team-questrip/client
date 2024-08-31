import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { fetchPlaceData } from '../api/place';
import { useLocation, useNavigate } from 'react-router-dom';
import getAddressData from '../api/address';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import InquireyIcon from '../components/ui/icon/InquireyIcon';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PlaceCard = lazy(() => import('../components/PlaceCard'));

const Discover = () => {
  const navigate = useNavigate();

  const handleGoToInquiry = () => {
    navigate('/inquiry');
  };

  const handleGoToSearchLocation = () => {
    navigate('/location-search');
  };

  let content;
  let latitude: number = 0;
  let longitude: number = 0;

  const location = useLocation();

  const changedLatitude = location?.state?.location?.lat;
  const changedLongitude = location?.state?.location?.lng;

  const {
    data: addressData,
    isLoading: isAddressLoading,
    isError: isAddressError,
    isFetching: isAddressFetching,
    error: addressError,
  } = useQuery({
    queryKey: ['address', location.state],
    queryFn: () => getAddressData(changedLatitude, changedLongitude),
  });

  if (isAddressLoading || isAddressFetching) {
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
    queryFn: ({ pageParam }) => fetchPlaceData(pageParam, latitude, longitude),
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
        {placeData.pages.map((page) => (
          <Suspense
            key={page.data.content[0].id}
            fallback={<div>Loading...</div>}
          >
            <PlaceCard placeData={page} />
          </Suspense>
        ))}
      </div>
    );
  }

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div>
      <GoBackHeader
        onBack={() => {
          navigate(-1);
        }}
        className="mt-2 mb-4"
      >
        <button
          onClick={handleGoToInquiry}
          className="cursor-pointer size-6 ml-auto hover:scale-110 absolute top-1/2 -translate-y-1/2 right-0"
        >
          <InquireyIcon />
        </button>
      </GoBackHeader>
      <div className="flex"></div>
      <h1 className="font-bold text-3xl mb-10">Questrip</h1>
      <div className="flex justify-between items-center my-5 gap-2 h-12">
        {content}
        <button
          className=" bg-secondaryText text-white rounded-full text-center p-2 px-3 cursor-pointer hover:scale-105"
          onClick={handleGoToSearchLocation}
        >
          Change
        </button>
      </div>
      {placeContent}
      <div ref={setTarget} className="pb-14" />
    </div>
  );
};

export default Discover;
