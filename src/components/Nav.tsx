import { GoHome, GoHeart, GoHomeFill, GoHeartFill } from 'react-icons/go';
import { HiUserCircle, HiOutlineUserCircle } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    setActiveTab(tab);
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
    <div className="flex justify-around text-mainTextColor bg-white p-5 border-t-[1px] fixed bottom-0 left-0 z-50 w-full">
      {renderButton('home', <GoHomeFill />, <GoHome />, 'Home')}
      {renderButton('recommend', <GoHeartFill />, <GoHeart />, 'Recommend')}
      {renderButton(
        'mypage',
        <HiUserCircle />,
        <HiOutlineUserCircle />,
        'My Page'
      )}
    </div>
  );
};

export default Nav;
