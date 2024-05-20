import { PlaceContentItem } from './Item';

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

export interface PlaceCardProps {
  placeData: GetPlaceProps['data'];
}
