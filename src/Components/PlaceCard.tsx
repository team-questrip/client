import { useNavigate } from 'react-router-dom';
import PlaceData from '../interface/PlaceData';

interface PlaceDataProps {
  placeData: PlaceData;
}

const PlaceCard = ({ placeData }: PlaceDataProps) => {
  const navigate = useNavigate();

  const handleGoToDetail = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="font-semibold text-lg">
      {placeData && placeData.data.content.length > 0 ? (
        placeData.data.content.map(place => (
          <div
            key={place.id}
            className="rounded-lg shadow-md bg-white cursor-pointer hover:scale-105 my-8"
            onClick={() => handleGoToDetail(place.id)}
          >
            <img
              src={place.images[0].url}
              className="rounded-lg"
              alt="장소 이미지"
            />
            <div className="flex flex-col p-4 gap-2">
              <div className="font-semibold">{place.placeName}</div>
              <div className="text-mainTextColor text-sm flex flex-col gap-1">
                <div>{place.content.recommendationReason}</div>
                <div>Distance: {place.distance.toFixed(1)}km</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No places found</div>
      )}
    </div>
  );
};

export default PlaceCard;
