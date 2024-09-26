import { useNavigate } from 'react-router-dom';
import { getUserCurrentPosition } from '../api/address';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';

interface CurrentLocationProps {
  show?: boolean;
}

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const navigate = useNavigate();

  const mutate = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  const handleClick = () => {
    getUserCurrentPosition().then((position) => {
      mutate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      navigate('/discover');
    });
  };

  return (
    <div
      hidden={!show}
      className="absolute left-0 top-[50px] h-screen w-[375px] z-10 bg-white"
    >
      <button onClick={handleClick} className="opacity-50">
        Use Current Location
      </button>
    </div>
  );
};

export default CurrentLocation;
