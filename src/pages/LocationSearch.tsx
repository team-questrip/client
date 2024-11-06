import { ChangeEvent, useRef, useState } from 'react';
import Search from '../components/LocationSearch/Search';
import useAutoComplete from '../hooks/useAutoComplete';
import { useNavigate } from 'react-router-dom';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';

const LocationSearch = () => {
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);

  const mutate = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (!e) {
      setShowCurrentLocation(true);
      return;
    }

    if (!e.target.value) {
      setShowCurrentLocation(true);
      return;
    }

    setShowCurrentLocation(false);
  };

  const onPlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();

    if (place.geometry?.location) {
      mutate({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }

    navigate('/discover');
  };

  useAutoComplete({ inputRef, onPlaceChanged });

  return (
    <>
      <Search>
        <>
          <Search.Form
            ref={inputRef}
            onChange={handleChange}
            onReset={() => navigate(-1)}
          />
          <Search.CurrentLocation show={showCurrentLocation} />
        </>
      </Search>
      <section>
        <p className="mt-10 px-10 text-center opacity-40">
          Please enter the address to set your current location.
        </p>
      </section>
    </>
  );
};

export default LocationSearch;
