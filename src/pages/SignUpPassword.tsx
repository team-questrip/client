import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import useSignUpPassword from '../hooks/useSignUpPassword';

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
      <h2>Create a password</h2>
      <p>You'll need to use this password to log in.</p>
      <input
        type="password"
        placeholder="Password"
        ref={inputRef}
        defaultValue={value}
      />
      {Boolean(error) && <p>{error}</p>}
      <button
        className="w-full"
        onClick={() => {
          if (inputRef.current) {
            onRegisterPassword(inputRef.current.value, onNext);
          }
        }}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpPassword;
