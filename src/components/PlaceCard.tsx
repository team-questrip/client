import { useNavigate } from 'react-router-dom';
import PlaceData from '../interface/placeData';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface PlaceDataProps {
  placeData: PlaceData;
}

const PlaceCard = ({ placeData }: PlaceDataProps) => {
  const navigate = useNavigate();

  const handleGoToDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="font-semibold text-lg ">
      {placeData && placeData.data.content.length > 0 ? (
        placeData.data.content.map((place) => (
          <div key={place.id} className="rounded-lg shadow-md bg-white my-8 ">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
            >
              {place.images.slice(0, 3).map((image) => (
                <SwiperSlide key={image.url}>
                  <img
                    src={image.url}
                    className="w-full h-[400px]"
                    alt="장소 이미지"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className="flex flex-col p-4 gap-2 cursor-pointer "
              onClick={() => handleGoToDetail(place.id)}
            >
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
