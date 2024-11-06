import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from '../components/@common/design/Frame';
import NavLayout from '../components/@common/design/NavLayout';
import Welcome from '../pages/Welcome';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import ProtectedRoute from '../pages/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PlaceDetailErrorFallback from '../components/Place/PlaceDetailErrorFallback';
import DiscoverErrorFallback from '../components/Discover/DiscoverErrorFallback';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const MyPage = lazy(() => import('../pages/MyPage'));
const Discover = lazy(() => import('../pages/Discover'));

const MapPage = lazy(() => import('../pages/MapPage'));
const PlaceDetailPage = lazy(() => import('../pages/PlaceDetailPage'));
const LocationSearch = lazy(() => import('../pages/LocationSearch'));
const Inquiry = lazy(() => import('../pages/Inquiry'));
const Survey = lazy(() => import('../pages/Survey'));
const NPSForm = lazy(() => import('../pages/NPS'));

const PageLoadingFallback = () => <p>loading...</p>;

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Frame />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route element={<NavLayout />}>
            <Route
              path="/my-page"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoadingFallback />}>
                    <MyPage />
                  </Suspense>
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
                  <ErrorBoundary FallbackComponent={DiscoverErrorFallback}>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Discover />
                    </Suspense>
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoadingFallback />}>
                    <MapPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/detail/:placeId"
            element={
              <ProtectedRoute>
                <ErrorBoundary FallbackComponent={PlaceDetailErrorFallback}>
                  <Suspense fallback={<PageLoadingFallback />}>
                    <PlaceDetailPage />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/location-search"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoadingFallback />}>
                  <LocationSearch />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inquiry"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoadingFallback />}>
                  <Inquiry />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoadingFallback />}>
                  <Survey />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nps"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoadingFallback />}>
                  <NPSForm />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
