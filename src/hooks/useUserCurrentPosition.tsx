import { useEffect, useState } from 'react';
import { useUserCurrentPositionStore } from '../store/userCurrentPosition';
import { requestUserPosition } from '../api/address';

interface GeolocationPositionError {
  message: string;
}

const useUserCurrentPosition = () => {
  const [error, setError] = useState<GeolocationPositionError>();

  const userCurrentPosition = useUserCurrentPositionStore(
    (state) => state.userCurrentPosition
  );

  const updateUserCurrentPosition = useUserCurrentPositionStore(
    (state) => state.updateUserCurrentPosition
  );

  useEffect(() => {
    if (userCurrentPosition !== null) return;

    const onSuccess = (position: GeolocationPosition) => {
      updateUserCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const onDenied = (error: GeolocationPositionError) => {
      const errorMesage = error.message;
      setError({
        message: errorMesage,
      });
    };

    requestUserPosition(onSuccess, onDenied);
  }, [updateUserCurrentPosition, userCurrentPosition]);

  return {
    userCurrentPosition,
    geolocationPositionError: error,
  };
};

export default useUserCurrentPosition;
