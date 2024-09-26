import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPlaceDataByPage } from '../api/place';
import { UserCurrentPosition } from '../types/current-position';

type PlaceInfiniteQueryProps = UserCurrentPosition & {
  category?: string | null;
};

const usePlaceInfiniteQuery = ({
  latitude,
  longitude,
  category,
}: PlaceInfiniteQueryProps) => {
  const {
    data: placeData,
    fetchNextPage,
    hasNextPage,
    isLoading: isPlaceDataLoading,
  } = useInfiniteQuery({
    staleTime: 1000 * 120,
    queryKey: ['place', latitude, longitude, category],
    queryFn: ({ pageParam }) =>
      fetchPlaceDataByPage(pageParam, latitude, longitude, category),
    // enabled: !!user,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? allPages.length : undefined;
    },
  });

  return {
    placeData,
    fetchNextPage,
    hasNextPage,
    isPlaceDataLoading,
  };
};

export default usePlaceInfiniteQuery;
