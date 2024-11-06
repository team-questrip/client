import useCategoriesQuery from '../../queries/useCategoryQuery';
import HomeCard from '../Home/HomeCard';

const CategoryCards = () => {
  const { categoryData, isCategoryDataLoading } = useCategoriesQuery();
  return (
    <>
      {isCategoryDataLoading && <p>Loading...</p>}
      {categoryData &&
        categoryData.groupList.map((group) => (
          <HomeCard
            img={`/icons/${group.enumName.toLowerCase()}.png`}
            category={group.groupName}
            key={group.enumName}
            categoryEnumName={group.enumName}
            cnt={group.placeCounts}
          />
        ))}
    </>
  );
};

export default CategoryCards;
