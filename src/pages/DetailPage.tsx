import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaceDetail } from '../api/place';
import PlaceDetail from '../components/PlaceDetail';
import Header from '../components/Header';
import NotFound from './NotFound';

const DetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();

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
      <Header text="Detail Information" />
      <div>{content}</div>
    </div>
  );
};

export default DetailPage;
