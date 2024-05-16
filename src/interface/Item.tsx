export interface ImagesItem {
  sequence: number;
  url: string;
}

export interface ContentItem {
  activity: string;
  recommendationReason: string;
}

export interface PlaceContentItem {
  content: ContentItem;
  distance: number;
  formattedAddress: string;
  googlePlaceId: string;
  id: string;
  images: ImagesItem[];
  location: string;
  openNow: string;
  openingHours: string[];
  placeName: string;
  primaryType: string;
}
