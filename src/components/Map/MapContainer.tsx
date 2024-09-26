import { Map } from '@vis.gl/react-google-maps';
import PlaceMarkers from './PlaceMarkers';
import { UserCurrentPosition } from '../../types/current-position';
import { Place } from '../../types/place';
import usePlaceInfiniteQuery from '../../queries/usePlaceInfiniteQuery';
import { useState } from 'react';
import Drawer from '../ui/Drawer';
import MapBottomSheet from './MapBottomSheet';
import Button from '../ui/Button';
import { useToast } from '../../hooks/useContexts';
import MapCategoryGroupTabs from './MapCategoryGroupTabs';
import useCategories from '../../hooks/useCategory';
import useCategoriesQuery from '../../queries/useCategoryQuery';

interface MapContainerProps {
  userCurrentPosition: UserCurrentPosition;
}

const MapContainer = ({ userCurrentPosition }: MapContainerProps) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>();

  const { selectedTab, onCategoryChange } = useCategories('0');

  const { categoryData } = useCategoriesQuery();

  const { placeData, fetchNextPage, hasNextPage } = usePlaceInfiniteQuery({
    ...userCurrentPosition,
    category: categoryData?.groupList[Number(selectedTab)].enumName,
  });

  const onClickMarker = (place: Place) => {
    setSelectedPlace(place);
  };

  const { showToast } = useToast();

  return (
    <section className="relative w-full h-full">
      <Map
        className="w-full h-full"
        defaultZoom={13}
        defaultCenter={{
          lat: userCurrentPosition.latitude,
          lng: userCurrentPosition.longitude,
        }}
        mapId={import.meta.env.VITE_Google_MAP_ID}
        onCameraChanged={() => {}}
      >
        {placeData && (
          <PlaceMarkers
            places={placeData.pages.flatMap((page) => page.data.content)}
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
          <MapBottomSheet place={selectedPlace} />
        </Drawer>
      )}
      <Button
        text="more places"
        className="!w-1/2 absolute top-20 left-1/2 -translate-x-1/2"
        onClick={() => {
          if (hasNextPage) {
            fetchNextPage();
          } else {
            showToast(
              'You’ve reached the end of the list. No more locations available.',
              'info'
            );
          }
        }}
      />
      <MapCategoryGroupTabs
        activeKey={selectedTab}
        onCategoryChange={onCategoryChange}
      />
    </section>
  );
};

export default MapContainer;
