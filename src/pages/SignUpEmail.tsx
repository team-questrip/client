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
        required
        ref={inputRef}
        defaultValue={value}
      />
      {Boolean(error) && <p>{error}</p>}
      <Button
        onClick={async () => {
          if (inputRef.current) {
            try {
              validateEmail(inputRef.current.value);
              const response = await checkEmail(inputRef.current.value);
              console.log(response.data);
              onNext(inputRef.current.value);
            } catch (error) {
              const errorObj = error as Error;
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
