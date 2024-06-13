export interface RecommendResponse {
  status: string;
  message: null;
  data: {
    id: number;
    userId: number;
    status: string;
    createdAt: string;
    place: {
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
      images: [
        {
          sequence: number;
          url: string;
        }
      ];
      openingHours: [];
      openNow: string;
    };
  };
}
