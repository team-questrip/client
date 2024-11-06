import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Place } from '../../types/place';

interface SliderProps {
  images: Place['images'];
  imageClassName?: string;
}

const Slider = ({ images, imageClassName }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={images.length >= 2}
    >
      {images.slice(0, 3).map((image) => (
        <SwiperSlide key={image.url}>
          <img src={image.url} className={imageClassName} alt="장소 이미지" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
