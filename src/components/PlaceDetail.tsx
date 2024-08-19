import { useState } from 'react';
import { MdOutlinePlace, MdOutlineRecommend } from 'react-icons/md';
import { RxTriangleDown } from 'react-icons/rx';
import { PlaceDetailData } from '../interface/placeDetailData';

import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface PlaceDetailProps {
  detailPlaceData: PlaceDetailData;
}

const PlaceDetail = ({ detailPlaceData }: PlaceDetailProps) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const ToggleOpen = () => {
    setIsToggleOpen((prev) => !prev);
  };

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
          loop={true}
        >
          {detailPlaceData.data.place.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                className="w-[343px] h-[400px]"
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
        <div className="text-red-500 text-xs">
          {detailPlaceData.data.place.openNow}
        </div>
      </div>
      <div>
        {detailPlaceData.data.place.primaryType} | {''}
        {detailPlaceData.data.directionSummary.distance} | {''}
        {detailPlaceData.data.directionSummary.duration}
      </div>
      <div onClick={ToggleOpen}>
        <div className="flex items-center gap-1">
          <button>Opening Hours</button>
          {isToggleOpen ? (
            <RxTriangleDown />
          ) : (
            <RxTriangleDown className="rotate-180" />
          )}
        </div>
        {isToggleOpen &&
          (detailPlaceData.data.place.openingHours?.length > 0 ? (
            <ul className="text-left ">
              {detailPlaceData.data.place.openingHours.map((v, index) => (
                <li key={index} className="text-sm">
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-left">We do not have any information 🥲</div>
          ))}
      </div>

      <div className="flex items-start gap-3">
        <div className="p-4 bg-mainColor rounded-lg">
          <MdOutlineRecommend className="size-8" />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Recommendation</div>
          <div className="text-sm text-wrap w-full whitespace-normal">
            {detailPlaceData.data.place.content.recommendationReason}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-4 bg-mainColor rounded-lg">
          <MdOutlinePlace className="size-8" />
        </div>
        <div>
          <div className="font-bold">Try this at this place</div>
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
