export interface PlaceData {
  status: string;
  message: string;
  data: {
    content: Place[];
    page: number;
    size: number;
    numberOfElements: number;
    hasNext: boolean;
  };
}

export interface Place {
  id: string;
  googlePlaceId: string;
  placeName: string;
  primaryType: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  content: {
    recommendationReason: string;
    activity: string;
  };
  images: {
    sequence: number;
    url: string;
  }[];
  openingHours: string[];
  openNow: string;
  distance: number;
}

export default PlaceData;
