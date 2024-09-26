import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import useCategoriesQuery from '../queries/useCategoryQuery';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';
import { getUserCurrentPosition } from '../api/address';
import { useEffect } from 'react';

function Home() {
  const { categoryData, isCategoryDataLoading } = useCategoriesQuery();

  const userCurrentPosition = useUserCurrentPositionStore(
    (state) => state.userCurrentPosition
  );
  const mutate = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  useEffect(() => {
    if (userCurrentPosition === null) {
      getUserCurrentPosition().then((position) => {
        mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [mutate, userCurrentPosition]);

  return (
    <>
      <header className="flex justify-center h-12">
        <Link to="/">
          <img src="/img/logo-horizontal.png" className="h-8" />
        </Link>
      </header>
      <div className="w-full p-4 flex-col grid grid-cols-2 gap-3">
        {isCategoryDataLoading && <p>Loading...</p>}
        {categoryData &&
          categoryData.groupList.map((group) => (
            <HomeCard
              img={`/icons/${group.enumName.toLowerCase()}.png`}
              category={group.groupName}
              key={group.enumName}
              categoryEnumName={group.enumName}
              cnt={group.placeCounts}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
