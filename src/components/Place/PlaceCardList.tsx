import { UserCurrentPosition } from '../../types/current-position';
import PlaceCard from './PlaceCard';
import usePlaceInfiniteQuery from '../../queries/usePlaceInfiniteQuery';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface PlaceCardListProps {
  userCurrentPosition: UserCurrentPosition;
  selectedCategory?: string | null;
}

const PlaceCardList = ({
  userCurrentPosition: { latitude, longitude },
  selectedCategory,
}: PlaceCardListProps) => {
  const {
    placeData,
    isPlaceDataLoading,
    isPlaceDataError,
    fetchNextPage,
    hasNextPage,
  } = usePlaceInfiniteQuery({
    latitude: latitude,
    longitude: longitude,
    category: selectedCategory,
  });

  // 다른 카테고리일땐 어떻게 동작하는지 몰라서 filter 거는거 대신 카테고리 마다 새 데이터 받도록 해놓음.. -> 뭔가 테스트할 방법이 필요.
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      {isPlaceDataLoading && <p className="mt-5">loading...</p>}
      {placeData &&
        placeData.pages.flatMap((page) => page.data.content).length === 0 && (
          <div className="mt-8">No places found</div>
        )}
      {placeData &&
        placeData.pages
          .flatMap((page) => page.data.content)
          .map((content) => <PlaceCard content={content} key={content.id} />)}
      {isPlaceDataError && (
        <p className="mt-5">There was an issue retrieving the data.</p>
      )}
      <div ref={setTarget} className="pb-14" />
    </>
  );
};

export default PlaceCardList;
