import { Outlet } from 'react-router-dom';

const Frame = () => {
  return (
    <div className="flex justify-center w-screen">
      <div className="w-[375px] h-full p-4 bg-white relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Frame;
