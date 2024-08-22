// 이 페이지는 숨겨버리기로 결정함

import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchRecommendData from '../api/recommendData';
import Header from '../components/Header';

import { MdOutlinePlace, MdOutlineRecommend } from 'react-icons/md';
import { axiosInstance } from '../api/axiosInstance';

import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';

const RecommendPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const latitude = JSON.parse(localStorage.getItem('latitude')!);
  const longitude = JSON.parse(localStorage.getItem('longitude')!);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recommend'],
    queryFn: () => fetchRecommendData(latitude, longitude),
  });

  let content = null;

  const handleRecommend = async (placeId: string, status: string) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/recommend`,
        { placeId: placeId, status: status },
        {
          headers: {
            Authorization: import.meta.env.VITE_TEST_TOKEN,
          },
        }
      );

      if (response.status === 200) {
        alert(`Recommendation ${status} successfully.`);
        queryClient.invalidateQueries({ queryKey: ['recommend'] });
        if (status === 'ACCEPTED') {
          navigate(`/detail/${placeId}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (data) {
    if (data.data.places.length > 0) {
      content = (
        <div className="h-full pb-20">
          <div>
            <h2 className="text-center py-2 text-md pb-3">{`We can recommend you ${data.data.places.length} places 🎉`}</h2>

            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
            >
              {data.data.places[0].images.slice(0, 3).map((image, index) => (
                <SwiperSlide>
                  <img
                    key={index}
                    className="w-full h-[400px]"
                    src={image.url}
                    alt={`Slide ${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex flex-col gap-4 mb-4">
              <div className="text-lg font-bold items-center">
                <div className="text-wrap whitespace-normal w-2/3 pt-4">
                  {data.data.places[0].placeName}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-4 bg-mainColor rounded-lg">
                  <MdOutlineRecommend className="size-8" />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">Recommendation</div>
                  <div className="text-sm text-wrap w-full whitespace-normal">
                    {data.data.places[0].content.recommendationReason}
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
                    {data.data.places[0].content.activity}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly py-5 ">
              <button
                className="bg-mainColor p-2 px-4 rounded-lg font-semibold shadow-md"
                onClick={() => {
                  handleRecommend(data.data.places[0].id, 'DENIED');
                }}
              >
                Deny
              </button>
              <button
                className="bg-white p-2 px-4 rounded-lg font-semibold shadow-md"
                onClick={() => {
                  handleRecommend(data.data.places[0].id, 'KEPT');
                }}
              >
                Keep
              </button>
              <button
                className="bg-subColor p-2 px-4 rounded-lg font-semibold shadow-md"
                onClick={() => {
                  handleRecommend(data.data.places[0].id, 'ACCEPTED');
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="h-[70vh]">
          <div className="flex flex-col justify-center items-center h-[70vh] mt-5">
            <img src="img/undraw_taken.svg" width={250} />
            <div className=" font-bold text-md text-center pt-10">
              We don`t have any more data today.
            </div>
          </div>
        </div>
      );
    }

    if (isError) {
      console.log(error);
    }

    if (isLoading) {
      console.log('loading');
    }
  }

  return (
    <div>
      <Header text={'Recommend'} />
      <div>{content}</div>
    </div>
  );
};

export default RecommendPage;
