import { useState } from 'react';
import { validatePassword } from '../utils/user';

const useSignUpPassword = () => {
  const [error, setError] = useState('');
  const onRegisterPassword = async (
    value: string,
    onNext: (password: string) => void
  ) => {
    try {
      validatePassword(value);
      onNext(value);
    } catch (error) {
      const errorObj = error as Error;
      setError(errorObj.message);
    }
  };

  return { onRegisterPassword, error };
};

export default useSignUpPassword;
