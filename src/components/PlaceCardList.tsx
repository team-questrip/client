import { UserCurrentPosition } from '../types/current-position';
import PlaceCard from './PlaceCard';
import usePlaceInfiniteQuery from '../queries/usePlaceInfiniteQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PlaceCardListProps {
  userCurrentPosition: UserCurrentPosition;
}

const PlaceCardList = ({ userCurrentPosition }: PlaceCardListProps) => {
  const { placeData, fetchNextPage, hasNextPage } =
    usePlaceInfiniteQuery(userCurrentPosition);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      {placeData ? (
        placeData.pages
          .flatMap((page) => page.data.content)
          .map((content) => <PlaceCard content={content} key={content.id} />)
      ) : (
        <div>No places found</div>
      )}
      <div ref={setTarget} className="pb-14" />
    </>
  );
};

export default PlaceCardList;
