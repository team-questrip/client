import { useNavigate } from 'react-router-dom';
import { getPlaceProps } from '../Pages/Home';

interface PlaceCardProps {
  placeData: getPlaceProps | null;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ placeData }) => {
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    if (placeData && placeData.data.content.length > 0) {
      const placeId = placeData.data.content[0].id;
      navigate(`/${placeId}`);
    }
  };

  return (
    <div className="font-semibold pt-1 text-lg">
      {placeData && placeData.data.content.length > 0 && (
        <div
          className="
            mt-4 rounded-lg
            shadow-md bg-white
            cursor-pointer
          "
          onClick={handleGoToDetail}
        >
          <img
            src={placeData.data.content[0].images[1].url}
            className="rounded-lg"
          />
          <div className="p-4">
            <div className="pt-2 font-semibold">
              {placeData.data.content[0].placeName}
            </div>
            <div className="text-mainTextColor text-sm">
              <div>
                {placeData.data.content[0].content.recommendationReason}
              </div>
              <div>
                Distance: {placeData.data.content[0].distance.toFixed(1)}mi
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceCard;
