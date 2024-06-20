import { useState } from 'react';
import { validateEmail } from '../utils/user';
import { checkEmail } from '../api/user';

const useSignUpEmail = () => {
  const [error, setError] = useState('');
  const onRegisterEmail = async (
    value: string,
    onNext: (email: string) => void
  ) => {
    try {
      validateEmail(value);
      await checkEmail(value);
      onNext(value);
    } catch (error) {
      const errorObj = error as Error;
      setError(errorObj.message);
    }
  };

  return { onRegisterEmail, error };
};

export default useSignUpEmail;
