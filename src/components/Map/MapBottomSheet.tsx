import { Place } from '../../types/place';
import { Link } from 'react-router-dom';
import VideoContent from '../Place/VideoContent';
import { isVideo as isVideoContent } from '../../utils/video';

interface MapBottomSheetProps {
  place: Place;
}

const MapBottomSheet = ({ place }: MapBottomSheetProps) => {
  const isVideo = isVideoContent(place.images);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-32 h-32 rounded-md overflow-hidden mr-4 shrink-0">
        {isVideo ? (
          <VideoContent videos={place.images} />
        ) : (
          <img
            className="w-full h-full"
            src={place.images[0].url}
            alt={`${place.placeName}'s photo`}
          />
        )}
      </div>
      <div className="h-full flex flex-col justify-center">
        <h4 className="font-bold text-lg">{place.placeName}</h4>
        {/* todo: category */}
        <span className="block text-secondaryText mb-2 text-base">
          {place.category} | {place.distance}km
        </span>
        <Link
          to={`/detail/${place.id}`}
          className="bg-secondaryBackground p-2 rounded-2xl w-32 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MapBottomSheet;
