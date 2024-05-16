import GetPlaceProps from '../pages/Home';
import { PlaceContentItem } from './Item';

export interface PlaceCardProps {
  placeData: GetPlaceProps | null;
}

export interface GetPlaceProps {
  data: {
    content: PlaceContentItem[];
    hasNext: boolean;
    numberOfElements: number;
    page: number;
    size: number;
  };
  message: string;
  status: string;
}
