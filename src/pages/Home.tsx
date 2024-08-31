import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';

function Home() {
  const handleClick = () => {
    console.log('Button Clicked!');
  };

  return (
    <>
      <header className="flex justify-center h-12">
        <Link to="/">
          <img src="/img/logo-horizontal.png" className="h-8" />
        </Link>
      </header>
      <div className="w-full p-4 flex-col grid grid-cols-2 gap-3">
        <HomeCard
          img={'/icons/food_and_drink.png'}
          category={'Food & Drinks'}
          cnt={79}
          onClick={handleClick}
        />
        <HomeCard
          img={'/icons/culture_and_history.png'}
          category={'Culture & History'}
          cnt={19}
          onClick={handleClick}
        />
        <HomeCard
          img={'/icons/nature_and_landmarks.png'}
          category={'Nature & Landmarks'}
          cnt={15}
          onClick={handleClick}
        />
        <HomeCard
          img={'/icons/shopping_and_entertainment.png'}
          category={'Shopping & Entertainments'}
          cnt={32}
          onClick={handleClick}
        />
        <HomeCard
          img={'/icons/wellness_and_relaxation.png'}
          category={'Wellness & Relaxation'}
          cnt={9}
          onClick={handleClick}
        />
        <HomeCard
          img={'/icons/day_tours_and_activities.png'}
          category={'Day Tours & Activitites'}
          cnt={51}
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default Home;
