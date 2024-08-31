import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaceDetail } from '../api/place';
import PlaceDetail from '../components/PlaceDetail';
import NotFound from './NotFound';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';

const DetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();

  const navigate = useNavigate();

  const {
    data: detailPlaceData,
    isLoading: isDetailPlaceLoading,
    isError: isDetailPlaceError,
    error: detailPlaceError,
  } = useQuery({
    queryKey: ['detailPlace', placeId],
    queryFn: () => fetchPlaceDetail({ placeId: placeId! }),
    enabled: !!placeId,
  });

  let content;

  if (isDetailPlaceLoading) {
    content = <div className="text-center">Loading...</div>;
  }

  if (isDetailPlaceError) {
    content = <NotFound />;
  }

  if (detailPlaceError) {
    content = <NotFound />;
  }

  if (detailPlaceData) {
    content = <PlaceDetail detailPlaceData={detailPlaceData} />;
  }

  return (
    <div>
      <GoBackHeader onBack={() => navigate(-1)} className="mt-2 mb-4" />
      <div>{content}</div>
    </div>
  );
};

export default DetailPage;
