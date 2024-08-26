import { Outlet } from 'react-router-dom';

const Frame = () => {
  return (
    <div className="flex justify-center w-screen h-full">
      <div className="h-full p-4 bg-white relative" style={{ width: '375px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Frame;
