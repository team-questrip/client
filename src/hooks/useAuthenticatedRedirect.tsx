import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

const useAuthenticatedRedirect = () => {
  const user = useUserStore((state) => state.user);

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
