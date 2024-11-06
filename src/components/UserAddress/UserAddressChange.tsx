import { useNavigate } from 'react-router-dom';
import useUserCurrentPosition from '../../hooks/useUserCurrentPosition';
import UserAddress from './UserAddress';

export const UserAddressChange = () => {
  const { userCurrentPosition, geolocationPositionError } =
    useUserCurrentPosition();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center my-5 gap-2 h-12">
      {userCurrentPosition ? (
        <UserAddress userCurrentPosition={userCurrentPosition} />
      ) : geolocationPositionError ? (
        <p>{geolocationPositionError.message}</p> // todo: ssr
      ) : (
        <p>loading...</p>
      )}
      <button
        className=" bg-secondaryText text-white rounded-full text-center p-2 px-3 cursor-pointer hover:scale-105"
        onClick={() => navigate('/location-search')}
      >
        Change
      </button>
    </div>
  );
};
