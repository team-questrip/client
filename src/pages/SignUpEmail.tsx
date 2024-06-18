import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import Button from '../components/Button';

import useSignUpEmail from '../hooks/useSignUpEmail';

export interface SignUpEmailProps {
  onNext: (email: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpEmail = ({ onNext, onPrev, value }: SignUpEmailProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onRegisterEmail, error } = useSignUpEmail();
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
        onClick={() => {
          if (inputRef.current) {
            onRegisterEmail(inputRef.current.value, onNext);
          }
        }}
        text="Continue"
      />
    </>
  );
};

export default SignUpEmail;
