import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import Button from '../components/Button';

import useSignUpEmail from '../hooks/useSignUpEmail';
import SignUpInput from '../components/SignUpInput';

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
      <h2 className="font-bold text-lg mb-1">Create your account</h2>
      <p className="text-center mb-4 opacity-60">
        To create a new account, you will need to verify your email address.
      </p>
      <SignUpInput
        type="email"
        placeholder="E-mail address"
        ref={inputRef}
        defaultValue={value}
        className="mb-2"
      />
      {Boolean(error) && <p className="text-red-500">{error}</p>}
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
