import { APIProvider } from '@vis.gl/react-google-maps';
import { initGoogleLib } from '../service/map-api-load';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';
import MapContainer from '../components/Map/MapContainer';

export default function MapPage() {
  const [init, setInit] = useState(false);
  const { data: userCurrentPosition } =
    useLocalstorageQuery<UserCurrentPosition>('currentPosition');

  useEffect(() => {
    initGoogleLib().then(() => setInit(true));
  }, []);

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
