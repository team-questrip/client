import { useRef, useState } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import { validatePassword } from '../utils/user';

export interface SignUpPasswordProps {
  onNext: (password: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpPassword = ({ onNext, onPrev, value }: SignUpPasswordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
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
            try {
              validatePassword(inputRef.current.value);
              onNext(inputRef.current.value);
            } catch (error) {
              const errorObj = error as Error;
              setError(errorObj.message);
            }
          }
        }}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpPassword;
