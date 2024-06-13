import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader';

export interface SignUpUsernameProps {
  onNext: (username: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpUsername = ({ onNext, onPrev, value }: SignUpUsernameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
      <button
        className="w-full"
        onClick={() => {
          if (inputRef.current) {
            onNext(inputRef.current.value);
          }
        }}
      >
        Continue
      </button>
    </>
  );
};

export default SignUpUsername;
