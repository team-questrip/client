import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPlaceData } from '../api/place';
import { UserCurrentPosition } from '../types/current-position';

const usePlaceInfiniteQuery = ({
  latitude,
  longitude,
}: UserCurrentPosition) => {
  const {
    data: placeData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    staleTime: 1000 * 120,
    queryKey: ['place', latitude, longitude],
    queryFn: ({ pageParam }) => fetchPlaceData(pageParam, latitude, longitude),
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
  };
};

export default usePlaceInfiniteQuery;
