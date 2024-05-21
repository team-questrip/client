import { useNavigate } from 'react-router-dom';
import { PlaceCardProps } from '../interface/props';

const PlaceCard: React.FC<PlaceCardProps> = ({ placeData }) => {
  const navigate = useNavigate();

  const handleGoToDetail = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="font-semibold pt-1 text-lg">
      {placeData && placeData.content.length > 0 ? (
        placeData.content.map(place => (
          <div
            key={place.id}
            className="mt-4 rounded-lg shadow-md bg-white cursor-pointer"
            onClick={() => handleGoToDetail(place.id)}
          >
            <img src={place.images[0]?.url} className="rounded-lg" />
            <div className="p-4">
              <div className="pt-2 font-semibold">{place.placeName}</div>
              <div className="text-mainTextColor text-sm">
                <div>{place.content.recommendationReason}</div>
                <div>Distance: {place.distance.toFixed(1)}mi</div>
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
