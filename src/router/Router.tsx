import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from '../components/ui/design/Frame';
import DetailPage from '../pages/DetailPage';
import LocationSearch from '../pages/LocationSearch';
import RecommendedPlaceSearch from '../pages/RecommendedPlaceSearch';
import SearchResults from '../pages/SearchResults/SearchResults';
import Inquiry from '../pages/Inquiry';
import Survey from '../pages/Survey';
import NavLayout from '../components/ui/design/NavLayout';
import Home from '../pages/Home';
import RecommendPage from '../pages/RecommendPage';
import MyPage from '../pages/MyPage';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<NavLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/detail/:placeId" element={<DetailPage />} />
          <Route path="/location-search" element={<LocationSearch />} />
          <Route
            path="/recommended-place-search"
            element={<RecommendedPlaceSearch />}
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
