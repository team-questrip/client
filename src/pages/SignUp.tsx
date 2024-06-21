import { useState } from 'react';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';
import { Link, useNavigate } from 'react-router-dom';
import SignUpUsername from './SignUpUsername';
import { AuthenticationData } from '../interface/user';
import { join } from '../api/user';
import { storeAuthenticationResponseDataToLocalStorage } from '../utils/user';
import useAuthenticatedRedirect from '../hooks/useAuthenticatedRedirect';

const SignUp = () => {
  useAuthenticatedRedirect();
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
            navigate(-1);
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
            try {
              join({ ...signUpData, password }).then((response) => {
                storeAuthenticationResponseDataToLocalStorage(
                  response.data.data
                );
                navigate('/');
              });
            } catch (error) {
              console.log(error);
              // todo: 에러 핸들링
            }
          }}
        />
      )}
      <p className="font-light mt-2">
        Already have an account?{' '}
        <Link
          to={'/sign-in'}
          className="text-mainTextColor font-semibold underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
