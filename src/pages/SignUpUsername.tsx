import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import useSignUpUsername from '../hooks/useSignUpUsername';

export interface SignUpUsernameProps {
  onNext: (username: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpUsername = ({ onNext, onPrev, value }: SignUpUsernameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { error, onRegisterUsername } = useSignUpUsername();

  return (
    <>
      <GoBackHeader onBack={onPrev} />
      <h2>Create a username</h2>
      <p>Create a username</p>
      <input
        type="text"
        placeholder="Username"
        ref={inputRef}
        defaultValue={value}
      />
      {Boolean(error) && <p>{error}</p>}
      <button
        className="w-full"
        onClick={() => {
          if (inputRef.current) {
            onRegisterUsername(inputRef.current.value, onNext);
          }
        }}
      >
        Continue
      </button>
    </>
  );
};

export default SignUpUsername;
