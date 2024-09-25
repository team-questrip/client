/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Tab } from 'baseui/tabs';
import { CATEGORIES_DATA } from '../common/category';

interface MapCategoryGroupTabsProps {
  activeKey: string;
  onCategoryChange: (category: string) => void;
}

const MapCategoryGroupTabs = ({
  activeKey,
  onCategoryChange,
}: MapCategoryGroupTabsProps) => {
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        onCategoryChange(String(activeKey));
      }}
      overrides={{
        Root: {
          style: {
            position: 'absolute',
            width: '100%',
            bottom: '20%',
            left: '0',
          },
        },
        TabBar: {
          style: {
            'overflow-x': 'auto',
            'border-bottom': 'none',
            'background-color': 'transparent',
          },
        },
        Tab: {
          style: ({ $active }: any) => ({
            'background-color': `${$active ? '#FF834D' : '#fff'}`,
            'border-radius': '2rem',
            'white-space': 'nowrap',
            display: 'inline-flex',
            'align-items': 'center',
            'border-bottom': 'none',
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

export default MapCategoryGroupTabs;
