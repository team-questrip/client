import { useState } from 'react';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';
import { useNavigate } from 'react-router-dom';
import SignUpUsername from './SignUpUsername';
import { SignUpData } from '../interface/user';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
  });
  const [step, setStep] = useState<'email' | 'password' | 'username'>('email');
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {step === 'email' && (
        <SignUpEmail
          value={signUpData.email}
          onPrev={() => {
            navigate('/');
          }}
          onNext={(email) => {
            setSignUpData((prev) => ({ ...prev, email }));
            setStep('username');
          }}
        />
      )}
      {step === 'username' && (
        <SignUpUsername
          value={signUpData.username}
          onPrev={() => {
            setStep('email');
          }}
          onNext={(username) => {
            setSignUpData((prev) => ({ ...prev, username }));
            setStep('password');
          }}
        />
      )}
      {step === 'password' && (
        <SignUpPassword
          value={signUpData.password}
          onPrev={() => {
            setStep('username');
          }}
          onNext={(password) => {
            // fetch
            // navigate to home
            alert(`hello ${JSON.stringify({ ...signUpData, password })}`);
            navigate('/');
          }}
        />
      )}
    </form>
  );
};

export default SignUp;
