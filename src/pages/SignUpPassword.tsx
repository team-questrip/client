import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import useSignUpPassword from '../hooks/useSignUpPassword';
import SignUpInput from '../components/SignUpInput';
import Button from '../components/Button';

export interface SignUpPasswordProps {
  onNext: (password: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpPassword = ({ onNext, onPrev, value }: SignUpPasswordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { error, onRegisterPassword } = useSignUpPassword();

  return (
    <>
      <GoBackHeader onBack={onPrev} />
      <h2 className="font-bold text-lg mb-1">Create a password</h2>
      <p className="text-center mb-4 opacity-60">
        You'll need to use this password to log in. Your password must be 8 to
        20 characters long, containing letters and numbers. Special characters
        and uppercase letters are allowed but not required.
      </p>
      <SignUpInput
        type="password"
        placeholder="Password"
        ref={inputRef}
        defaultValue={value}
        className="mb-2"
      />
      {Boolean(error) && <p className="text-red-500">{error}</p>}
      <Button
        text="Sign Up"
        onClick={() => {
          if (inputRef.current) {
            onRegisterPassword(inputRef.current.value, onNext);
          }
        }}
      />
    </>
  );
};

export default SignUpPassword;
