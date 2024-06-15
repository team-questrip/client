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
import Survey from './pages/Survey';
import Inquiry from './pages/Inquiry';
import RecommendPage from './pages/RecommendPage';
import NavLayout from './design/NavLayout';
import Mypage from './pages/Mypage';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/detail/:placeId" element={<DetailPage />} />
            <Route path="/location-search" element={<LocationSearch />} />
            <Route
              path="/recommended-place-search"
              element={<RecommendedPlaceSearch />}
            />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/survey" element={<Survey />} />
            <Route element={<NavLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/recommend" element={<RecommendPage />} />
              <Route path="/mypage" element={<Mypage />} />
            </Route>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Frame>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
