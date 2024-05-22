import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FetchPlaceDetail from '../api/FetchPlaceDetail';
import { IoArrowBack } from 'react-icons/io5';
import PlaceDetail from '../components/PlaceDetail';

const DetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();

  const {
    data: detailPlaceData,
    isLoading: isDetailPlaceLoading,
    isError: isDetailPlaceError,
    error: detailPlaceError,
  } = useQuery({
    queryKey: ['detailPlace', placeId],
    queryFn: () => FetchPlaceDetail({ placeId: placeId! }),
    enabled: !!placeId,
  });

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  let content;

  if (isDetailPlaceLoading) {
    content = <div className="text-center">Loading...</div>;
  }

  if (isDetailPlaceError) {
    content = <div>{detailPlaceError.message}</div>;
  }

  if (detailPlaceData) {
    content = <PlaceDetail detailPlaceData={detailPlaceData} />;
  }

  return (
    <div>
      <header className="pb-3">
        <IoArrowBack
          onClick={handleBackPage}
          className=" cursor-pointer size-6 hover:scale-125"
        />
      </header>
      <div>{content}</div>
    </div>
  );
};

export default DetailPage;
