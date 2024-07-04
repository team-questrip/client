import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import useAcceptedRecommendQuery from '../queries/useAcceptedRecommendQuery';

const MyPage = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const { hasNextPage, fetchNextPage, data } = useAcceptedRecommendQuery();
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (!user) {
    navigate('/welcome');
    return null;
  }

  return (
    <>
      <GoBackHeader onBack={handleBack}>
        <GoBackHeader.Title>{'My Page'}</GoBackHeader.Title>
      </GoBackHeader>
      <div className="mb-8">
        <h3 className="text-4xl">{user.username}</h3>
        <span className="text-mainTextColor font-extralight block w-1/2 text-right text-lg">
          {user.email}
        </span>
      </div>
      <div className="pb-20">
        <h3 className="text-2xl font-semibold mb-4">Quest History</h3>
        <ul>
          {data
            ? data.pages.map((content) => {
                return (
                  <li key={content.id}>
                    <Link to={`/detail/${content.place.id}`} className="flex">
                      <div className="mr-4">
                        <h4 className="font-bold">{content.place.placeName}</h4>
                        <span className="text-mainTextColor text-sm font-light">
                          {content.place.formattedAddress}
                        </span>
                      </div>
                      <div className="basis-1/2 h-[75px] rounded-xl overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={content.place.images[0].url}
                          alt={content.place.placeName + ' photo'}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
        <div ref={setTarget} className="h-[1rem]" />
      </div>
    </>
  );
};
export default MyPage;
