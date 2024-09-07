import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from '../components/ui/design/Frame';
import PlaceDetailPage from '../pages/PlaceDetailPage';
import LocationSearch from '../pages/LocationSearch';
import Inquiry from '../pages/Inquiry';
import Survey from '../pages/Survey';
import NavLayout from '../components/ui/design/NavLayout';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import NPSForm from '../pages/NPS';
import Map from '../pages/Map';
import Discover from '../pages/Discover';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<NavLayout />}>
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/map" element={<Map />} />
          </Route>
          <Route path="/detail/:placeId" element={<PlaceDetailPage />} />
          <Route path="/location-search" element={<LocationSearch />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/nps" element={<NPSForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
