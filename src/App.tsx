import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Frame from './design/Frame';
import RecommendedPlaceSearch from './pages/RecommendedPlaceSearch';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import DetailPage from './pages/DetailPage';
import LocationSearch from './pages/LocationSearch';
import SearchResults from './pages/SearchResults/SearchResults';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Inquiry from './pages/Inquiry';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:placeId" element={<DetailPage />} />
            <Route path="/location-search" element={<LocationSearch />} />
            <Route
              path="/recommended-place-search"
              element={<RecommendedPlaceSearch />}
            />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/inquiry" element={<Inquiry />} />
          </Routes>
        </Frame>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
