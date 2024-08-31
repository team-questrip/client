import { Link } from 'react-router-dom';
import { PlaceData } from '../types/place';
import Slider from './Slider';

interface PlaceDataProps {
  placeData: PlaceData;
}

const PlaceCard = ({ placeData }: PlaceDataProps) => {
  return (
    <div className="text-lg ">
      {placeData && placeData.data.content.length > 0 ? (
        placeData.data.content.map((place) => (
          <Link to={`/detail/${place.id}`} key={place.id}>
            <div className="rounded-lg shadow-md bg-white my-8 overflow-hidden">
              <Slider
                images={place.images}
                imageClassName="w-full h-[192px] object-cover"
              />

              <div className="flex flex-col p-4 gap-2 cursor-pointer ">
                <div className="font-semibold">{place.placeName}</div>
                <div className="text-mainTextColor text-sm flex flex-col gap-1">
                  <div>{place.content.recommendationReason}</div>
                  <div className="text-secondaryText">
                    Distance: {place.distance.toFixed(1)}km
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>No places found</div>
      )}
    </div>
  );
};

export default PlaceCard;
