import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { FormEvent, useState } from 'react';
import { AuthenticationData } from '../types/user';
import { login } from '../api/user';
import Button from '../components/Button';
import Input from '../components/Input';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../types/api';
import { storeAuthenticationResponseDataToLocalStorage } from '../utils/user';
import { useToast } from '../hooks/useContexts';
import useAuthenticatedRedirect from '../hooks/useAuthenticatedRedirect';

const SignIn = () => {
  useAuthenticatedRedirect();
  const navigate = useNavigate();

  const { showToast } = useToast();
  const [signInData, setSignInData] = useState<
    Omit<AuthenticationData, 'username'>
  >({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(signInData);
      storeAuthenticationResponseDataToLocalStorage(response.data.data);
      navigate('/');
    } catch (error) {
      const errorObj = error as AxiosError<APIErrorResponse>;
      const message =
        errorObj &&
        errorObj.response &&
        errorObj.response.data &&
        errorObj.response.data.message
          ? errorObj.response.data.message
          : 'Something went wrong.';

      console.log(error);
      showToast(message, 'error');
    }
  };

  // todo: input 쓰는 상호작용 부분을 hook으로 추상화할 수 있어보임.
  return (
    <>
      <GoBackHeader
        onBack={() => {
          navigate(-1);
        }}
      />
      <form onSubmit={handleSubmit}>
        {/* 추가된 영역 */}
        <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
          <img className="w-28" src="/img/logo-default.png" />
          <div className="w-full h-32 relative flex-col justify-start items-start gap-2.5">
            <div className="font-semibold text-2xl">Hello 👋</div>
            <div className="font-semibold text-3xl text-secondary">
              Travelers
            </div>
            <div className="font-semibold text-2xl">Welcome back!</div>
          </div>
        </div>
        {/* <h2 className="font-bold text-lg mb-1">Welcome back!</h2> */}
        <Input
          type="email"
          placeholder="E-mail address"
          name="email"
          onChange={(e) => {
            setSignInData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-4"
          label={'Email'}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setSignInData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-2"
          label={'Password'}
        />
        <div className="mb-8 flex text-hintText text-sm justify-end items-end">
          Forgot password?
        </div>
        <Button type="submit" text="Sign In" />
        <p className="text-hintText mt-6 flex items-center justify-center">
          Don't have an account?
          <Link
            to={'/sign-up'}
            className="text-secondary font-semibold underline ml-2"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;
