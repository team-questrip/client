import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { useNavigate } from 'react-router-dom';
import { UserCurrentPosition } from '../types/current-position';
import { getUserCurrentPosition } from '../api/address';

interface CurrentLocationProps {
  show?: boolean;
}

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const navigate = useNavigate();
  const { mutate } = useLocalstorageQuery<UserCurrentPosition | null>(
    'currentPosition'
  );

  const handleClick = () => {
    mutate(null);
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
