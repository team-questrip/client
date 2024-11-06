import { useNavigate } from 'react-router-dom';
import { requestUserPosition } from '../../api/address';
import { useUserCurrentPositionStore } from '../../store/userCurrentPosition';
import { useToast } from '../../hooks/useContexts';

interface CurrentLocationProps {
  show?: boolean;
}

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const navigate = useNavigate();

  const mutate = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  const { showToast } = useToast();

  const handleClick = () => {
    requestUserPosition(
      (position) => {
        mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        navigate('/discover');
      },
      () => {
        showToast(
          'You have denied location access. Please allow location access to use this feature.',
          'warning'
        );
      }
    );
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
