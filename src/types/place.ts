// 공통 타입 정의
interface Location {
  latitude: number;
  longitude: number;
}

interface Image {
  sequence: number;
  url: string;
}

export interface Content {
  recommendationReason: string;
  activity: string;
}

export interface PlaceBase {
  id: string;
  googlePlaceId: string;
  placeName: string;
  primaryType: string;
  formattedAddress: string;
  location: Location;
  content: Content;
  images: Image[];
  openingHours: string[];
  openNow: string;
  categoryGroup: string;
  category: string;
}

// 리팩토링된 PlaceData 타입
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

export interface Place extends PlaceBase {
  distance: number;
}

// 리팩토링된 PlaceDetailData 타입
export interface PlaceDetailData {
  status: string;
  message: string;
  data: {
    place: PlaceBase;
    directionSummary: {
      distance: string;
      duration: string;
    };
  };
}
