import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../@common/GoBackHeader/GoBackHeader';
import InquiryIcon from '../@common/icon/InquiryIcon';

const DiscoverErrorFallback = () => {
  const navigate = useNavigate();
  return (
    <>
      <GoBackHeader
        onBack={() => {
          navigate(-1);
        }}
        className="mt-2 mb-4"
      >
        <Link
          to={'/inquiry'}
          className="cursor-pointer size-6 ml-auto hover:scale-110 absolute top-1/2 -translate-y-1/2 right-0"
        >
          <InquiryIcon />
        </Link>
      </GoBackHeader>
      <p>unexpected error occurerd.</p>
    </>
  );
};

export default DiscoverErrorFallback;
