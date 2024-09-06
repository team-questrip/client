import { useNavigate, useParams } from 'react-router-dom';
import PlaceDetail from '../components/PlaceDetail';
import NotFound from './NotFound';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import usePlaceDetailQuery from '../queries/usePlaceDetailQuery';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';

const DetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { data: userCurrentPosition } =
    useLocalstorageQuery<UserCurrentPosition>('currentPosition');

  const navigate = useNavigate();

  const { detailPlaceData, isDetailPlaceError, isDetailPlaceLoading } =
    usePlaceDetailQuery({
      placeId,
      userCurrentPosition,
    });

  let content;

  if (isDetailPlaceLoading) {
    content = <div className="text-center">Loading...</div>;
  }

  if (isDetailPlaceError) {
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
