import { useNavigate, useParams } from 'react-router-dom';
import PlaceDetailContent from '../components/Place/PlaceDetailContent';
import NotFound from './NotFound';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import usePlaceDetailQuery from '../queries/usePlaceDetailQuery';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';

const PlaceDetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { data: userCurrentPosition } =
    useLocalstorageQuery<UserCurrentPosition>('currentPosition');

  const navigate = useNavigate();

  const { detailPlaceData, isDetailPlaceError, isDetailPlaceLoading } =
    usePlaceDetailQuery({
      placeId,
      userCurrentPosition,
    });

  return (
    <div>
      <GoBackHeader onBack={() => navigate(-1)} className="mt-2 mb-4" />
      <div>
        {isDetailPlaceLoading && <div className="text-center">Loading...</div>}
        {isDetailPlaceError && <NotFound />}
        {detailPlaceData ? (
          <PlaceDetailContent detailPlaceData={detailPlaceData} />
        ) : null}
      </div>
    </div>
  );
};

export default PlaceDetailPage;
