import { useState } from 'react';
import { validateUsername } from '../utils/user';

const useSignUpUsername = () => {
  const [error, setError] = useState('');
  const onRegisterUsername = async (
    value: string,
    onNext: (username: string) => void
  ) => {
    try {
      validateUsername(value);
      onNext(value);
    } catch (error) {
      const errorObj = error as Error;
      setError(errorObj.message);
    }
  };

  return { onRegisterUsername, error };
};

export default useSignUpUsername;
