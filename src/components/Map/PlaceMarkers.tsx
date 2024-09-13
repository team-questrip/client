import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { Place } from '../../types/place';

interface PlaceMarkersProps {
  places: Place[];
  onClickMarker: (place: Place) => void;
}

const PlaceMarkers = ({ places, onClickMarker }: PlaceMarkersProps) => {
  const map = useMap();

  const handleMarkerClick = (e: google.maps.MapMouseEvent, place: Place) => {
    if (!map) return;
    if (!e.latLng) return;
    map.panTo(e.latLng);
    onClickMarker(place);
  };

  return (
    <>
      {places.map((place: Place) => (
        <AdvancedMarker
          key={place.id}
          position={{
            lat: place.location.latitude,
            lng: place.location.longitude,
          }}
          clickable={true}
          onClick={(e) => handleMarkerClick(e, place)}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PlaceMarkers;
