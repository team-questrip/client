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
      location: Location;
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
