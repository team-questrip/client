/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Tab } from 'baseui/tabs';

interface CategoryGroupTabsProps {
  activeKey: string;
  onCategoryChange: (category: string) => void;
}

const categoryGroup = [
  'All',
  'Food & Drinks',
  'Culture & History',
  'Nature & Landmarks',
  'Shopping & Entertainment',
  'Wellness & Relaxation',
  'Day Tours & Activities',
];

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
      {categoryGroup.map((group, index) => (
        <Tab title={group} key={index}></Tab>
      ))}
    </Tabs>
  );
};

export default CategoryGroupTabs;
