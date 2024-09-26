import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import InquiryIcon from '../components/ui/icon/InquiryIcon';
import { useEffect } from 'react';
import { getUserCurrentPosition } from '../api/address';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';
import UserAddress from '../components/UserAddress';
import PlaceCardList from '../components/PlaceCardList';
import CategoryGroupTabs from '../components/CategoryGroupTabs';
import useCategory from '../hooks/useCategory';
import useCategoryQuery from '../queries/useCategoryQuery';

let initialRender = true;

const Discover = () => {
  const navigate = useNavigate();

  // todo: error boundary + error handling
  const { data: userCurrentPosition, mutate } =
    useLocalstorageQuery<UserCurrentPosition | null>('currentPosition');

  const { categoryData } = useCategoryQuery();

  const [searchParam] = useSearchParams();
  const initialCategory = searchParam.get('category');
  const initialTab =
    initialCategory && categoryData
      ? String(
          categoryData.groupList.findIndex(
            (g) => g.enumName === initialCategory
          )
        )
      : '0'; // todo: initialTab에 맞게 스크롤까지

  const { selectedTab, onCategoryChange } = useCategory(initialTab);

  useEffect(() => {
    if (!initialRender) return;

    initialRender = false;

    mutate(null);
    getUserCurrentPosition().then((position) => {
      mutate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [mutate]);

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
      <div className="flex justify-between items-center my-5 gap-2 h-12">
        {userCurrentPosition ? (
          <UserAddress userCurrentPosition={userCurrentPosition} />
        ) : (
          <p>Loading......</p> // todo: ssr
        )}
        <button
          className=" bg-secondaryText text-white rounded-full text-center p-2 px-3 cursor-pointer hover:scale-105"
          onClick={() => navigate('/location-search')}
        >
          Change
        </button>
      </div>
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
    </div>
  );
};

export default Discover;
