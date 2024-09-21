import { UserCurrentPosition } from '../types/current-position';
import PlaceCard from './PlaceCard';
import usePlaceInfiniteQuery from '../queries/usePlaceInfiniteQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PlaceCardListProps {
  userCurrentPosition: UserCurrentPosition;
  selectedCategory?: string | null;
}

const PlaceCardList = ({
  userCurrentPosition: { latitude, longitude },
  selectedCategory,
}: PlaceCardListProps) => {
  const { placeData, isPlaceDataLoading, fetchNextPage, hasNextPage } =
    usePlaceInfiniteQuery({
      latitude: latitude,
      longitude: longitude,
      category: selectedCategory,
    });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      {isPlaceDataLoading && <p>loading...</p>}
      {placeData &&
        placeData.pages.flatMap((page) => page.data.content).length === 0 && (
          <div className="mt-8">No places found</div>
        )}
      {placeData &&
        placeData.pages
          .flatMap((page) => page.data.content)
          .map((content) => <PlaceCard content={content} key={content.id} />)}
      <div ref={setTarget} className="pb-14" />
    </>
  );
};

export default PlaceCardList;
