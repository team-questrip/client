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
      // 얘는 hook으로 딱히 더 캡슐화 할 수 없어보임.
      validateEmail(value);
      await checkEmail(value);
      onNext(value);
    } catch {
      setError('Duplicate email.');
    }
  };

  return { onRegisterEmail, error };
};

export default useSignUpEmail;
