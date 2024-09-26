import { useCallback, useState } from 'react';

const useCategory = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const onCategoryChange = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  return {
    selectedTab,
    onCategoryChange,
  };
};

export default useCategory;
