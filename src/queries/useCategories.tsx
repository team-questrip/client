import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';

const useCategories = () => {
  const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery(
    {
      queryKey: ['categories'],
      staleTime: 1000 * 60 * 60 * 24,
      queryFn: fetchCategories,
      // enabled:
    }
  );

  return {
    categoriesData,
    isCategoriesDataLoading,
  };
};

export default useCategories;
