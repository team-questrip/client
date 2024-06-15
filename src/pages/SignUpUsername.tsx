import { useRef, useState } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import { validateUsername } from '../utils/user';

export interface SignUpUsernameProps {
  onNext: (username: string) => void;
  onPrev: () => void;
  value: string;
}

const SignUpUsername = ({ onNext, onPrev, value }: SignUpUsernameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
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
            try {
              validateUsername(inputRef.current.value);
              onNext(inputRef.current.value);
            } catch (error) {
              const errorObj = error as Error;
              setError(errorObj.message);
            }
          }
        }}
      >
        Continue
      </button>
    </>
  );
};

export default SignUpUsername;
