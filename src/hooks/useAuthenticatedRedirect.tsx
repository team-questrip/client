import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthenticatedRedirect = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', {
        replace: true,
      });
    }
  }, [user, navigate]);
};

export default useAuthenticatedRedirect;
