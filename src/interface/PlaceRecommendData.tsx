export interface PlaceRecommendData {
  status: string;
  message: string;
  data: {
    places: {
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
    }[];
  };
}
