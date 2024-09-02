import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { initGoogleLib } from '../service/map-api-load';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Button from '../components/Button';
import { useEffect, useState } from 'react';

export default function MapPage() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initGoogleLib().then(() => setInit(true));
  }, []);

  return (
    <div className="w-full h-screen flex items-center">
      <ErrorBoundary fallbackRender={fallbackRender}>
        <APIProvider apiKey={import.meta.env.VITE_Google_API_KEY}>
          {init && (
            <Map
              className="w-full h-full"
              defaultZoom={13}
              defaultCenter={{ lat: 36, lng: 127 }}
              mapId={'5cc412afa0a84fb6'}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log(
                  'camera changed:',
                  ev.detail.center,
                  'zoom:',
                  ev.detail.zoom
                )
              }
            />
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
