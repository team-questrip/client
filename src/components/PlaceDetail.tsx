import { PlaceDetailData } from '../types/place';

import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import OpenNow from './OpenNow';
import LocationIcon from './ui/icon/LocationIcon';
import ThumsUpIcon from './ui/icon/ThumsUpIcon';
import CheckCircleIcon from './ui/icon/CheckCircleIcon';

interface PlaceDetailProps {
  detailPlaceData: PlaceDetailData;
}

const PlaceDetail = ({ detailPlaceData }: PlaceDetailProps) => {
  const handleGoToPlace = () => {
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

    const placeLatitude = detailPlaceData.data.place.location.latitude;
    const placeLongitude = detailPlaceData.data.place.location.longitude;

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${placeLatitude},${placeLongitude}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={detailPlaceData.data.place.images.length >= 2}
        >
          {detailPlaceData.data.place.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                className="w-[343px] h-[192px] object-cover"
                alt="장소 이미지"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-between text-lg font-bold items-center">
        <div className="text-wrap whitespace-normal w-2/3">
          {detailPlaceData.data.place.placeName}
        </div>
        <div className="">
          <OpenNow openNow={detailPlaceData.data.place.openNow} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <LocationIcon />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-wrap w-full whitespace-normal">
            {detailPlaceData.data.directionSummary.distance} | {''}
            {detailPlaceData.data.directionSummary.duration}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <ThumsUpIcon />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-wrap w-full whitespace-normal">
            {detailPlaceData.data.place.content.recommendationReason}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-4 bg-mainInputBorderColor rounded-lg">
          <CheckCircleIcon />
        </div>
        <div>
          <div className="text-sm">
            {detailPlaceData.data.place.content.activity}
          </div>
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

export default PlaceDetail;
