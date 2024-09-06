import { UserCurrentPosition } from '../types/current-position';
import { Suspense } from 'react';
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
      {placeData &&
        placeData.pages.map((page) => (
          <Suspense
            key={page.data.content[0].id}
            fallback={<div>Loading...</div>}
          >
            <PlaceCard placeData={page} />
          </Suspense>
        ))}
      <div ref={setTarget} className="pb-14" />
    </>
  );
};

export default PlaceCardList;
