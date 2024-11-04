import { useNavigate, useParams } from 'react-router-dom';
import PlaceDetailContent from '../components/Place/PlaceDetailContent';
import GoBackHeader from '../components/@common/GoBackHeader/GoBackHeader';
import usePlaceDetailQuery from '../queries/usePlaceDetailQuery';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';

const PlaceDetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const userCurrentPosition = useUserCurrentPositionStore(
    (state) => state.userCurrentPosition
  );

  const navigate = useNavigate();

  const { detailPlaceData, isDetailPlaceLoading } = usePlaceDetailQuery({
    placeId,
    userCurrentPosition,
  });

  return (
    <div>
      <GoBackHeader onBack={() => navigate(-1)} className="mt-2 mb-4" />
      <div>
        {isDetailPlaceLoading && <div className="text-center">Loading...</div>}
        {detailPlaceData ? (
          <PlaceDetailContent detailPlaceData={detailPlaceData} />
        ) : null}
      </div>
    </div>
  );
};

export default PlaceDetailPage;
