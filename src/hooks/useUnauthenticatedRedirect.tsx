import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useUnauthenticatedRedirect = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in', {
        replace: true,
      });
    }
  }, [user, navigate]);
};

export default useUnauthenticatedRedirect;
