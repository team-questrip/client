import { APIProvider } from '@vis.gl/react-google-maps';
import { initGoogleLib } from '../service/map-api-load';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import MapContainer from '../components/Map/MapContainer';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';
import { getUserCurrentPosition } from '../api/address';

export default function MapPage() {
  const [init, setInit] = useState(false);

  const userCurrentPosition = useUserCurrentPositionStore(
    (state) => state.userCurrentPosition
  );

  const mutate = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  useEffect(() => {
    initGoogleLib().then(() => setInit(true));
  }, []);

  useEffect(() => {
    if (userCurrentPosition === null) {
      getUserCurrentPosition().then((position) => {
        mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [mutate, userCurrentPosition]);

  return (
    <div className="w-full h-screen flex items-center">
      <ErrorBoundary fallbackRender={fallbackRender}>
        <APIProvider apiKey={import.meta.env.VITE_Google_API_KEY}>
          {init && userCurrentPosition && (
            <MapContainer userCurrentPosition={userCurrentPosition} />
          )}
        </APIProvider>
      </ErrorBoundary>
    </div>
  );
}

function fallbackRender({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="">
      <div role="alert">
        <p className="text-primaryText mb-5">
          Opps! An error occurred while loading the map.
        </p>
        <Button onClick={resetErrorBoundary} text="Retry!"></Button>
      </div>
    </div>
  );
}
