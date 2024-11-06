import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/@common/GoBackHeader/GoBackHeader';
import InquiryIcon from '../components/@common/icon/InquiryIcon';
import PlaceCardList from '../components/Place/PlaceCardList';
import CategoryGroupTabs from '../components/Category/CategoryGroupTabs';
import useCategories from '../hooks/useCategory';
import useCategoriesQuery from '../queries/useCategoryQuery';
import { ErrorBoundary } from 'react-error-boundary';
import useUserCurrentPosition from '../hooks/useUserCurrentPosition';
import PlaceListErrorFallback from '../components/Place/PlaceListErrorFallback';
import { UserAddressChange } from '../components/UserAddress/UserAddressChange';
import { useInitialTab } from '../hooks/useInitialTab';

const Discover = () => {
  const navigate = useNavigate();

  const { userCurrentPosition } = useUserCurrentPosition();
  const { categoryData } = useCategoriesQuery();

  const initialTab = useInitialTab();

  const { selectedTab, onCategoryChange } = useCategories(initialTab);

  return (
    <div>
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
      <h1 className="font-bold text-3xl mb-10">Questrip</h1>
      <ErrorBoundary FallbackComponent={PlaceListErrorFallback}>
        <UserAddressChange />
        <CategoryGroupTabs
          onCategoryChange={onCategoryChange}
          activeKey={selectedTab}
        />
        {!userCurrentPosition || !categoryData ? (
          <p className="mt-5">loading...</p>
        ) : (
          <PlaceCardList
            userCurrentPosition={userCurrentPosition}
            selectedCategory={
              categoryData.groupList[Number(selectedTab)]?.enumName
            }
          />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Discover;
