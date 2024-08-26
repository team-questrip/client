import { Place } from './PlaceData';

export interface AcceptedRecommendContent {
  place: Place;
  status: 'ACCEPTED' | 'COMPLETED' | 'REVOKED';
  createdAt: string;
  id: number;
}

export interface AcceptedRecommend {
  content: AcceptedRecommendContent[];
  hasNext: boolean;
  numberOfElements: number;
  page: number;
  size: number;
}
