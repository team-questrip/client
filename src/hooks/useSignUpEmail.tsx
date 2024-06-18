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
    } catch (error) {
      const errorObj = error as Error;
      // todo: check email api 를 통해 통신을 해서 에러를 받으면 해당 에러 메시지가 잘 표시가 돠는지 확인
      setError(errorObj.message);
    }
  };

  return { onRegisterEmail, error };
};

export default useSignUpEmail;
