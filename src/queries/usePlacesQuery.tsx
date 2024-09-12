import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '../api/place';
import { UserCurrentPosition } from '../types/current-position';

const usePlacesQuery = ({ latitude, longitude }: UserCurrentPosition) => {
  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
  } = useQuery({
    queryKey: ['places', latitude, longitude],
    staleTime: 1000 * 120,
    queryFn: () => fetchPlaces(latitude, longitude),
    // enabled: !!user
  });

  return {
    placesData,
    isPlacesLoading,
    isPlacesError,
  };
};

export default usePlacesQuery;
