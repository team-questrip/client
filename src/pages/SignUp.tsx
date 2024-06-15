import { useState } from 'react';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';
import { useNavigate } from 'react-router-dom';
import SignUpUsername from './SignUpUsername';
import { AuthenticationData } from '../interface/user';
import { join } from '../api/user';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState<AuthenticationData>({
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
            alert(`hello ${JSON.stringify({ ...signUpData, password })}`);
            try {
              join({ ...signUpData, password }).then(() => {
                navigate('/');
              });
            } catch (error) {
              console.log(error);
            }
          }}
        />
      )}
    </form>
  );
};

export default SignUp;
