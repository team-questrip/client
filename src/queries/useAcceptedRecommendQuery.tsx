import { useInfiniteQuery } from '@tanstack/react-query';
import { getAcceptedRecommendList } from '../api/my-page';

const useAcceptedRecommendQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['accepted-recommend'],
    queryFn: async ({ pageParam }) => {
      const res = await getAcceptedRecommendList(pageParam);
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.data.hasNext ? lastPage.data.data.page + 1 : null;
    },
    select: (data) => ({
      pages: data?.pages.flatMap((page) => page.data.data.content),
      pageParams: data.pageParams,
    }),
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useAcceptedRecommendQuery;
