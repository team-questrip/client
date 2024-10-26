import { RefObject, useEffect, useRef } from 'react';
import { initGoogleLib } from '../service/map-api-load';
import { defaultBounds } from '../constants/autocomplete';

interface useAutoCompleteParameters {
  inputRef: RefObject<HTMLInputElement>;
  fields?: string[];
  types?: string[];
  onPlaceChanged: (autocomplete: google.maps.places.Autocomplete) => void;
}

export default function useAutoComplete({
  inputRef,
  fields = ['geometry'],
  types = ['geocode'],
  onPlaceChanged,
}: useAutoCompleteParameters) {
  const eventId = useRef<google.maps.MapsEventListener>();
  useEffect(() => {
    initGoogleLib().then(() => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            bounds: defaultBounds,
            componentRestrictions: { country: 'kr' },
            fields,
            strictBounds: false,
            types,
          }
        );

        eventId.current = autocomplete.addListener('place_changed', () =>
          onPlaceChanged(autocomplete)
        );
      }
    });

    return () => {
      if (eventId.current) {
        google.maps.event.removeListener(eventId.current);
      }
    };
  }, [inputRef, fields, types, onPlaceChanged]);
}
