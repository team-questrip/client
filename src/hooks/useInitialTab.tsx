import { useSearchParams } from 'react-router-dom';
import useCategoriesQuery from '../queries/useCategoryQuery';

export const useInitialTab = () => {
  const [searchParam] = useSearchParams();
  const { categoryData } = useCategoriesQuery();
  const initialCategory = searchParam.get('category');
  const initialTab =
    initialCategory && categoryData
      ? String(
          categoryData.groupList.findIndex(
            (g) => g.enumName === initialCategory
          )
        )
      : '0'; // todo: initialTab에 맞게 스크롤까지
  return initialTab;
};
