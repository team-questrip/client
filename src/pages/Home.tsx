import { Link } from 'react-router-dom';
import CategoryCards from '../components/CategoryCards';
import useUserCurrentPosition from '../hooks/useUserCurrentPosition';
import { ErrorBoundary } from 'react-error-boundary';
import CategoryCardsErrorFallback from '../components/CategoryCardsErrorFallback';

function Home() {
  useUserCurrentPosition();

  return (
    <>
      <header className="flex justify-center h-12">
        <Link to="/">
          <img src="/img/logo-horizontal.png" className="h-8" />
        </Link>
      </header>

      <ErrorBoundary FallbackComponent={CategoryCardsErrorFallback}>
        <div className="w-full p-4 flex-col grid grid-cols-2 gap-3">
          <CategoryCards />
        </div>
      </ErrorBoundary>
    </>
  );
}

export default Home;
