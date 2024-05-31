import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const NavLayout = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
};
export default NavLayout;
