import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ActiveDiscoverIcon from './ui/icon/ActiveDiscoverIcon';
import DiscoverIcon from './ui/icon/DiscoverIcon';
import ActiveHomeIcon from './ui/icon/ActiveHomeIcon';
import HomeIcon from './ui/icon/HomeIcon';
import ActiveMyPageIcon from './ui/icon/ActiveMyPageIcon';
import MyPageIcon from './ui/icon/MyPageIcon';
import ActiveMapIcon from './ui/icon/ActiveMapIcon';
import MapIcon from './ui/icon/MapIcon';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(
      location.pathname === '/' ? 'home' : location.pathname.replace('/', '')
    );
  }, [location.pathname]);

  const handleNavigation = (tab: string) => {
    navigate(tab === 'home' ? '/' : `/${tab}`);
  };

  const renderButton = (
    tab: string,
    ActiveIcon: React.ReactNode,
    InactiveIcon: React.ReactNode,
    label: string
  ) => (
    <button
      className="flex flex-col items-center w-1/3"
      onMouseEnter={() => setActiveTab(tab)}
      onMouseLeave={() =>
        setActiveTab(
          location.pathname === '/'
            ? 'home'
            : location.pathname.replace('/', '')
        )
      }
      onClick={() => handleNavigation(tab)}
    >
      {activeTab === tab ? ActiveIcon : InactiveIcon}
      <div>{label}</div>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white py-5 border-t-[1px] w-[375px] z-50">
      <div className="flex justify-around text-mainTextColor">
        {renderButton('home', <ActiveHomeIcon />, <HomeIcon />, 'Home')}
        {renderButton(
          'discover',
          <ActiveDiscoverIcon />,
          <DiscoverIcon />,
          'Discover'
        )}
        {renderButton('map', <ActiveMapIcon />, <MapIcon />, 'Map')}
        {renderButton(
          'my-page',
          <ActiveMyPageIcon />,
          <MyPageIcon />,
          'My Page'
        )}
      </div>
    </div>
  );
};

export default Nav;
