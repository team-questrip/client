/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Tab } from 'baseui/tabs';
import { CATEGORIES_DATA } from '../common/category';

interface CategoryGroupTabsProps {
  activeKey: string;
  onCategoryChange: (category: string) => void;
}

const CategoryGroupTabs = ({
  activeKey,
  onCategoryChange,
}: CategoryGroupTabsProps) => {
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        onCategoryChange(String(activeKey));
      }}
      overrides={{
        TabBar: {
          style: {
            'overflow-x': 'auto',
            'background-color': '#fff',
            'border-bottom': '2px solid #E2E2E2',
          },
        },
        Tab: {
          style: ({ $active }: any) => ({
            'border-bottom': `2px solid ${$active ? '#FF834D' : 'transparent'}`,
            'white-space': 'nowrap',
            display: 'inline-flex',
            'align-items': 'center',
          }),
        },
        TabContent: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      {CATEGORIES_DATA.groupList.map((group, index) => (
        <Tab title={group.groupName} key={index}></Tab>
      ))}
    </Tabs>
  );
};

export default CategoryGroupTabs;
