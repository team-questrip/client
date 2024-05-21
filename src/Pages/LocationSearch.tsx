import { ChangeEvent, useRef, useState } from "react";
import Search from "../components/Search";
import useAutoComplete from "../hooks/useAutoComplete";

const LocationSearch = () => {
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

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
    console.log(place.geometry?.location?.toJSON());
    // To Do : 위도, 경도 전달.
  };

  useAutoComplete({ inputRef, onPlaceChanged });

  return (
    <>
      <Search>
        <>
          <Search.Form ref={inputRef} onChange={handleChange} />
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
