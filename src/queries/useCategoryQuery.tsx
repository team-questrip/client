import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';

const useCategoryQuery = () => {
  const { data: categoryData, isLoading: isCategoryDataLoading } = useQuery({
    queryKey: ['category'],
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: fetchCategories,
  });
  return {
    categoryData,
    isCategoryDataLoading,
  };
};

export default useCategoryQuery;
