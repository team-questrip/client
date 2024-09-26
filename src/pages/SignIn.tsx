import { Link, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { AuthenticationData } from '../types/user';
import { login } from '../api/user';
import Button from '../components/ui/Button';
import Input from '../components/Input';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../types/api';
import { storeAuthenticationResponseDataToLocalStorage } from '../utils/user';
import { useToast } from '../hooks/useContexts';
import useAuthenticatedRedirect from '../hooks/useAuthenticatedRedirect';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

const SignIn = () => {
  useAuthenticatedRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationData>();

  const navigate = useNavigate();

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<AuthenticationData> = async (data) => {
    try {
      const response = await login(data);
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

  return (
    <>
      <GoBackHeader
        onBack={() => {
          navigate(-1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Input
          type="email"
          placeholder="E-mail address"
          className="mb-4"
          label={'Email'}
          {...register('email', { required: 'This is required.' })}
        />
        <ErrorMessage message={errors.email?.message} />
        <Input
          type="password"
          placeholder="Password"
          className="mb-2"
          label={'Password'}
          {...register('password', { required: 'This is required.' })}
        />
        <ErrorMessage message={errors.password?.message} />
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
