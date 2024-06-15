import { useRef, useState } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import Button from '../components/Button';
import { checkEmail } from '../api/user';
import { validateEmail } from '../utils/user';

export interface SignUpEmailProps {
  onNext: (email: string) => void;
  onPrev: () => void;
  value: string;
}

// 일단 uncontrolled로 input을 관리하긴 하는데, 다른 페이지에서 코드 중복이
// 어떻냐에 따라 controlled로 바꿔버릴수도 있음.
// 통합적인 관리를 위해... 특히 error 다루는 부분. onChange로 handle하는게 나을 수도.
// react form hook은 내부적으로 어떻게 동작하는지 보는 게 도움될수도. : handler 내부에서 에러를 set하는 것 같음.
// button을 이렇게 만들어볼 수 있을 것 같다.
const SignUpEmail = ({ onNext, onPrev, value }: SignUpEmailProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  return (
    <>
      <GoBackHeader onBack={onPrev} />
      <h2>Create your account</h2>
      <p>
        To create a new account, you will need to verify your email address. We
        will send you an email with a confirmation code.
      </p>
      <input
        type="email"
        placeholder="E-mail address"
        ref={inputRef}
        defaultValue={value}
      />
      {Boolean(error) && <p>{error}</p>}
      <Button
        onClick={async () => {
          if (inputRef.current) {
            try {
              // 얘는 hook으로 딱히 더 캡슐화 할 수 없어보임.
              validateEmail(inputRef.current.value);
              await checkEmail(inputRef.current.value);
              onNext(inputRef.current.value);
            } catch (error) {
              const errorObj = error as Error;
              // todo: check email api 를 통해 통신을 해서 에러를 받으면 해당 에러 메시지가 잘 표시가 돠는지 확인
              setError(errorObj.message);
            }
          }
        }}
        text="Continue"
      />
    </>
  );
};

export default SignUpEmail;
