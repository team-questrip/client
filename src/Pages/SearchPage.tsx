import { ChangeEvent, useEffect, useRef, useState } from "react";
import { initAutocomplete } from "../service/map-api-load";
import { defaultBounds } from "../common/map";
import Search from "../components/Search";

const SearchPage = () => {
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const eventId = useRef<google.maps.MapsEventListener>();

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

  useEffect(() => {
    initAutocomplete().then(() => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            bounds: defaultBounds,
            componentRestrictions: { country: "kr" },
            fields: ["geometry"],
            strictBounds: false,
            types: ["geocode"],
          }
        );

        eventId.current = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log(place.geometry?.location?.toJSON());
          // To Do : 위도, 경도 전달.
        });
      }
    });

    return () => {
      if (eventId.current) {
        google.maps.event.removeListener(eventId.current);
      }
    };
  }, []);

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
          Please enter the travel destination you would like to recommend.
        </p>
      </section>
    </>
  );
};

export default SearchPage;
