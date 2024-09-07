import { useQuery } from '@tanstack/react-query';
import { fetchPlaceDetail } from '../api/place';
import { UserCurrentPosition } from '../types/current-position';

interface PlaceDetailQueryProps {
  placeId?: string;
  userCurrentPosition?: UserCurrentPosition | null;
}

const usePlaceDetailQuery = ({
  placeId,
  userCurrentPosition,
}: PlaceDetailQueryProps) => {
  const {
    data: detailPlaceData,
    isLoading: isDetailPlaceLoading,
    isError: isDetailPlaceError,
  } = useQuery({
    queryKey: ['detailPlace', placeId],
    staleTime: 1000 * 60,
    queryFn: () => fetchPlaceDetail({ placeId, userCurrentPosition }),
    enabled: !!placeId && !!userCurrentPosition,
  });

  return {
    detailPlaceData,
    isDetailPlaceLoading,
    isDetailPlaceError,
  };
};

export default usePlaceDetailQuery;
