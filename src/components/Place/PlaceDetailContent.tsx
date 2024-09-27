import { PlaceDetailData } from '../../types/place';
import OpenNow from '../OpenNow';
import LocationIcon from '../ui/icon/LocationIcon';
import ThumsUpIcon from '../ui/icon/ThumsUpIcon';
import CheckCircleIcon from '../ui/icon/CheckCircleIcon';
import Slider from '../Slider';
import VideoContent from '../VideoContent';
import { isVideo as isVideoContent } from '../../utils/video';
import { useUserCurrentPositionStore } from '../../store/userCurrentPosition';
import Label from '../ui/Label';

interface PlaceDetailContentProps {
  detailPlaceData: PlaceDetailData;
}

const PlaceDetailContent = ({
  detailPlaceData: { data },
}: PlaceDetailContentProps) => {
  const isVideo = isVideoContent(data.place.images);

  const userCurrentPosition = useUserCurrentPositionStore(
    (state) => state.userCurrentPosition
  );

  const handleGoToPlace = () => {
    if (userCurrentPosition) {
      const latitude = userCurrentPosition.latitude;
      const longitude = userCurrentPosition.longitude;

      const placeLatitude = data.place.location.latitude;
      const placeLongitude = data.place.location.longitude;

      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${placeLatitude},${placeLongitude}`
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        {isVideo ? (
          <VideoContent
            videos={data.place.images}
            className="w-[343px] h-[192px] object-cover"
          />
        ) : (
          <Slider
            images={data.place.images}
            imageClassName="w-[343px] h-[192px] object-cover"
          />
        )}
      </div>
      <div className="text-lg font-bold items-center">
        <div className="text-wrap whitespace-nowrap mb-3">
          {data.place.placeName}
        </div>
        <div className="flex">
          <OpenNow openNow={data.place.openNow} />
          <Label className="bg-hintText ml-2">{data.place.categoryGroup}</Label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <LocationIcon />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-wrap w-full whitespace-normal">
            {data.directionSummary.distance} | {''}
            {data.directionSummary.duration}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <ThumsUpIcon />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-wrap w-full whitespace-normal">
            {data.place.content.recommendationReason}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <CheckCircleIcon />
        </div>
        <div>
          <div className="text-sm">{data.place.content.activity}</div>
        </div>
      </div>

      <button
        className="bg-subColor hover:bg-orange-500 rounded-md text-white p-2"
        onClick={handleGoToPlace}
      >
        Get Direction
      </button>
    </div>
  );
};

export default PlaceDetailContent;
