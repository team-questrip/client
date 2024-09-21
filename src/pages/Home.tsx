import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import useCategories from '../queries/useCategories';

function Home() {
  const handleClick = () => {
    console.log('Button Clicked!');
  };

  const { categoriesData, isCategoriesDataLoading } = useCategories();

  return (
    <>
      <header className="flex justify-center h-12">
        <Link to="/">
          <img src="/img/logo-horizontal.png" className="h-8" />
        </Link>
      </header>
      {isCategoriesDataLoading && <p>Loading...</p>}

      <div className="w-full p-4 flex-col grid grid-cols-2 gap-3">
        {categoriesData &&
          categoriesData.groupList.map((group) => (
            <HomeCard
              img={`/icons/${group.enumName.toLowerCase()}.png`}
              category={group.groupName}
              cnt={group.placeCounts}
              onClick={handleClick}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
