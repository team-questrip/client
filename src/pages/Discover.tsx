import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import InquiryIcon from '../components/ui/icon/InquiryIcon';
import { useCallback, useEffect, useState } from 'react';
import { getUserCurrentPosition } from '../api/address';
import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { UserCurrentPosition } from '../types/current-position';
import UserAddress from '../components/UserAddress';
import PlaceCardList from '../components/PlaceCardList';
import CategoryGroupTabs from '../components/CategoryGroupTabs';
import useCategories from '../queries/useCategories';

let initialRender = true;

const Discover = () => {
  const navigate = useNavigate();

  const { categoriesData } = useCategories();
  // todo: error boundary + error handling
  const { data: userCurrentPosition, mutate } =
    useLocalstorageQuery<UserCurrentPosition | null>('currentPosition');

  const [selectedTab, setSelectedTab] = useState('0');

  const onCategoryChange = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

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
      {userCurrentPosition && categoriesData && (
        <PlaceCardList
          userCurrentPosition={userCurrentPosition}
          selectedCategory={
            categoriesData.groupList[Number(selectedTab) - 1]?.enumName
          }
        />
      )}
    </div>
  );
};

export default Discover;
