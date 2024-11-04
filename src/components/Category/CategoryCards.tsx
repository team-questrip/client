import useCategoriesQuery from '../../queries/useCategoryQuery';
import HomeCard from '../Home/HomeCard';

const CategoryCards = () => {
  const { categoryData, isCategoryDataLoading, isCategoryDataError } =
    useCategoriesQuery();
  return (
    <>
      {isCategoryDataError && (
        <p>Something went wrong while category data is loaded.</p>
      )}
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
