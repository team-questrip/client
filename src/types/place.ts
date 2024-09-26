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
  categoryGroup: string;
  category: string;
}

export interface Address {
  status: string;
  message: string;
  data: {
    formattedAddress: string;
  };
}

export interface PlaceDetailData {
  status: string;
  message: string;
  data: {
    place: {
      content: {
        recommendationReason: string;
        activity: string;
      };
      formattedAddress: string;
      googlePlaceId: string;
      id: string;
      images: [
        {
          sequence: number;
          url: string;
        }
      ];
      location: {
        latitude: number;
        longitude: number;
      };
      openNow: string;
      openingHours: [];
      placeName: string;
      primaryType: string;
    };
    directionSummary: {
      distance: string;
      duration: string;
    };
  };
}
