import { useRef } from 'react';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import useSignUpUsername from '../hooks/useSignUpUsername';
import SignUpInput from '../components/SignUpInput';
import Button from '../components/Button';

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
      <h2 className="font-bold text-lg mb-1">Create a username</h2>
      <p className="text-center mb-4 opacity-60">Create a username</p>
      <SignUpInput
        type="text"
        placeholder="Username"
        ref={inputRef}
        defaultValue={value}
        className="mb-2"
      />
      {Boolean(error) && <p className="text-red-500">{error}</p>}
      <Button
        onClick={() => {
          if (inputRef.current) {
            onRegisterUsername(inputRef.current.value, onNext);
          }
        }}
        text="Continue"
      />
    </>
  );
};

export default SignUpUsername;
