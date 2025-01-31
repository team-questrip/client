import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';

const useCategoriesQuery = () => {
  const {
    data: categoryData,
    isLoading: isCategoryDataLoading,
    isError: isCategoryDataError,
  } = useQuery({
    queryKey: ['category'],
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: fetchCategories,
    throwOnError: true,
  });
  return {
    categoryData,
    isCategoryDataLoading,
    isCategoryDataError,
  };
};

export default useCategoriesQuery;
