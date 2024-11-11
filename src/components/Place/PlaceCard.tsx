import { Link } from 'react-router-dom';
import { Place } from '../../types/place';
import Slider from '../Place/Slider';
import VideoContent from '../Place/VideoContent';
import { isVideo as isVideoContent } from '../../utils/video';
import { memo } from 'react';

interface PlaceCardProps {
  content: Place;
}

const PlaceCard = memo(({ content }: PlaceCardProps) => {
  const isVideo = isVideoContent(content.images);

  return (
    <div className="text-lg ">
      <Link to={`/detail/${content.id}`} key={content.id}>
        <div className="rounded-lg shadow-md bg-white my-8 overflow-hidden">
          {isVideo ? (
            <VideoContent
              videos={content.images}
              className={'w-full h-[192px] object-cover'}
            />
          ) : (
            <Slider
              images={content.images}
              imageClassName="w-full h-[192px] object-cover"
            />
          )}
          <div className="flex flex-col p-4 gap-2 cursor-pointer ">
            <div className="font-semibold">{content.placeName}</div>
            <div className="text-mainTextColor text-sm flex flex-col gap-1">
              <div>{content.content.recommendationReason}</div>
              <div className="text-secondaryText">
                Distance: {content.distance.toFixed(1)}km
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default PlaceCard;
