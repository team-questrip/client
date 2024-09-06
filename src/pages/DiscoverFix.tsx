import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import InquiryIcon from '../components/ui/icon/InquiryIcon';
import { useEffect } from 'react';
import { getUserCurrentPosition } from '../api/address';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';
import UserAddress from '../components/UserAddress';
import PlaceCardList from '../components/PlaceCardList';

const DiscoverFix = () => {
  const navigate = useNavigate();

  const { data: userCurrentPosition, mutate } =
    useLocalstorageQuery<UserCurrentPosition>('currentPosition');

  const { state } = useLocation();

  useEffect(() => {
    const userCurrentPositionSearchResult = state
      ? state.userCurrentPosition
      : null;

    getUserCurrentPosition().then((position) => {
      mutate({
        latitude: userCurrentPositionSearchResult
          ? userCurrentPositionSearchResult.latitude
          : position.coords.latitude,
        longitude: userCurrentPositionSearchResult
          ? userCurrentPositionSearchResult.longitude
          : position.coords.longitude,
      });
    });
  }, [mutate, state]);

  return (
    <div>
      <GoBackHeader
        onBack={() => {
          navigate(-1);
        }}
        className="mt-2 mb-4"
      >
        <Link
          to={'/inquiry'}
          className="cursor-pointer size-6 ml-auto hover:scale-110 absolute top-1/2 -translate-y-1/2 right-0"
        >
          <InquiryIcon />
        </Link>
      </GoBackHeader>
      <div className="flex"></div>
      <h1 className="font-bold text-3xl mb-10">Questrip</h1>
      <div className="flex justify-between items-center my-5 gap-2 h-12">
        {userCurrentPosition && (
          <UserAddress userCurrentPosition={userCurrentPosition} />
        )}
        <button
          className=" bg-secondaryText text-white rounded-full text-center p-2 px-3 cursor-pointer hover:scale-105"
          onClick={() => navigate('/location-search')}
        >
          Change
        </button>
      </div>
      {userCurrentPosition && (
        <PlaceCardList userCurrentPosition={userCurrentPosition} />
      )}
    </div>
  );
};

export default DiscoverFix;
