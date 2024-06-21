import { useState } from 'react';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';
import { Link, useNavigate } from 'react-router-dom';
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
              // todo: 바로 로그인 시켜야 함. (UI적으로)
              join({ ...signUpData, password }).then(() => {
                // 응답 데이터: 로그인 시에 받아오는 데이터랑 똑같음
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
