import { useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import GoBackHeader from './GoBackHeader/GoBackHeader';

const PlaceDetailErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <>
      <GoBackHeader onBack={() => navigate(-1)} className="mt-2 mb-4" />
      <NotFound description="An issue occurred while retrieving the place details." />
    </>
  );
};

export default PlaceDetailErrorFallback;
