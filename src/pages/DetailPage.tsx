import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FetchPlaceDetail from '../api/FetchPlaceDetailData';
import PlaceDetail from '../components/PlaceDetail';
import Header from '../components/Header';

const DetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();

  const {
    data: detailPlaceData,
    isLoading: isDetailPlaceLoading,
    isError: isDetailPlaceError,
    error: detailPlaceError,
  } = useQuery({
    queryKey: ['detailPlace', placeId],
    queryFn: () => FetchPlaceDetail({ placeId: placeId! }),
    enabled: !!placeId,
  });

  let content;

  if (isDetailPlaceLoading) {
    content = <div className="text-center">Loading...</div>;
  }

  if (isDetailPlaceError) {
    content = <div>{detailPlaceError.message}</div>;
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
