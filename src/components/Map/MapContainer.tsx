import { Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import PlaceMarkers from './PlaceMarkers';
import { UserCurrentPosition } from '../../types/current-position';
import { Place } from '../../types/place';
import usePlaceInfiniteQuery from '../../queries/usePlaceInfiniteQuery';
import { useState } from 'react';
import Drawer from '../ui/Drawer';
import { Link } from 'react-router-dom';

interface MapContainerProps {
  userCurrentPosition: UserCurrentPosition;
}

const MapContainer = ({ userCurrentPosition }: MapContainerProps) => {
  // todo : 마커찍기
  // 필요한 데이터: 유저 위치 중심의 place의 위치.
  // 이 플레이스들의 위치 정보 가지고 마커를 찍음.
  // 유저 위치 변경되면 다시 새로 불러올 필요 있음.

  // todo: error handle

  // todo: 마커 누르면 해당 디테일로 가는 drawer 뜨게
  // 카메라 중심도 옮겨야됨.
  // 필요한 데이터: 클릭된 place의 정보.

  const [selectedPlace, setSelectedPlace] = useState<Place | null>();

  const { placeData, fetchNextPage, hasNextPage } =
    usePlaceInfiniteQuery(userCurrentPosition);

  const onClickMarker = (place: Place) => {
    console.log(place);
    setSelectedPlace(place);
  };

  return (
    <>
      <Map
        className="w-full h-full"
        defaultZoom={13}
        defaultCenter={{
          lat: userCurrentPosition.latitude,
          lng: userCurrentPosition.longitude,
        }}
        mapId={import.meta.env.VITE_Google_MAP_ID}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            'camera changed:',
            ev.detail.center,
            'zoom:',
            ev.detail.zoom
          )
        }
      >
        {placeData && (
          <PlaceMarkers
            places={placeData.pages[0].data.content}
            onClickMarker={onClickMarker}
          />
        )}
      </Map>
      {selectedPlace && (
        <Drawer
          isOpen={Boolean(selectedPlace)}
          onClose={() => {
            setSelectedPlace(null);
          }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="w-32 h-32 rounded-md overflow-hidden mr-4 shrink-0">
              <img
                className="w-full h-full"
                src={selectedPlace.images[0].url}
                alt={`${selectedPlace.placeName}'s photo`}
              />
            </div>
            <div className="h-full flex flex-col justify-center">
              <h4 className="font-bold text-lg">{selectedPlace.placeName}</h4>
              {/* todo: category */}
              <span className="block text-secondaryText mb-2 text-base">
                Category | {selectedPlace.distance}km
              </span>
              <Link
                to={`/detail/${selectedPlace.id}`}
                className="bg-secondaryBackground p-2 rounded-2xl w-32 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MapContainer;
