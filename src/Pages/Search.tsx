import { useEffect, useRef } from "react";
import SearchForm from "../components/SearchForm";
import { initAutocomplete } from "../service/map-api-load";
import { defaultBounds } from "../common/map";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const eventId = useRef<google.maps.MapsEventListener>();

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
      <SearchForm ref={inputRef} />
      <section>
        <p className="mt-10 px-10 text-center opacity-40">
          Please enter the travel destination you would like to recommend.
        </p>
      </section>
    </>
  );
};

export default Search;
