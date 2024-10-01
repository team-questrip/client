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
import Discover from '../pages/Discover';
import MapPage from '../pages/MapPage';
import ProtectedRoute from '../pages/ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<NavLayout />}>
            <Route
              path="/my-page"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/discover"
              element={
                <ProtectedRoute>
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/detail/:placeId"
            element={
              <ProtectedRoute>
                <PlaceDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/location-search"
            element={
              <ProtectedRoute>
                <LocationSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inquiry"
            element={
              <ProtectedRoute>
                <Inquiry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey"
            element={
              <ProtectedRoute>
                <Survey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nps"
            element={
              <ProtectedRoute>
                <NPSForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
