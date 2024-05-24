export interface GoogleLocationItem {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GoogleSearchResultItem {
  place: {
    formatted_address: string;
    name: string;
    place_id: string;
    [key: string]: unknown;
  };
}
