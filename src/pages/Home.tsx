import { Link } from 'react-router-dom';
import CategoryCards from '../components/CategoryCards';
import useUserCurrentPosition from '../hooks/useUserCurrentPosition';

function Home() {
  useUserCurrentPosition();

  return (
    <>
      <header className="flex justify-center h-12">
        <Link to="/">
          <img src="/img/logo-horizontal.png" className="h-8" />
        </Link>
      </header>
      <div className="w-full p-4 flex-col grid grid-cols-2 gap-3">
        <CategoryCards />
      </div>
    </>
  );
}

export default Home;
