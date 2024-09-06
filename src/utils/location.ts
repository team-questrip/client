export function getUserLocationFromLocalStorage(): {
  lat: number;
  lng: number;
} {
  const lat = localStorage.getItem('latitude');
  const lng = localStorage.getItem('longitude');

  if (lat !== null && lng !== null) {
    return {
      lat: JSON.parse(lat),
      lng: JSON.parse(lng),
    };
  }

  throw new Error('There is an issue with the location information.”');
}
