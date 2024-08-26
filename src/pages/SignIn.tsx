import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { FormEvent, useState } from 'react';
import { AuthenticationData } from '../types/user';
import { login } from '../api/user';
import Button from '../components/Button';
import SignInInput from '../components/SignInInput';
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
      const message = errorObj.response
        ? errorObj.response.data.message
        : 'Something went wrong.';

      showToast(message, 'error');
    }
  };

  // todo: input 쓰는 상호작용 부분을 hook으로 추상화할 수 있어보임.
  return (
    <>
      <form onSubmit={handleSubmit}>
        <GoBackHeader
          onBack={() => {
            navigate(-1);
          }}
        />
        <h2 className="font-bold text-lg mb-1">Welcome back!</h2>
        <SignInInput
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
        />
        <SignInInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setSignInData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-4"
        />
        <Button type="submit" text="Sign In" />
        <p className="font-light mt-2">
          New To Questrips?{' '}
          <Link
            to={'/sign-up'}
            className="text-mainTextColor font-semibold underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;
