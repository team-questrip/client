import { Link, useNavigate } from 'react-router-dom';
import { UserRegistrationData } from '../types/user';
import { join } from '../api/user';
import { storeAuthenticationResponseDataToLocalStorage } from '../utils/user';
import useAuthenticatedRedirect from '../hooks/useAuthenticatedRedirect';
import Input from '../components/Input';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import Button from '../components/Button';
import { APIErrorResponse } from '../types/api';
import { useToast } from '../hooks/useContexts';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

const SignUp = () => {
  useAuthenticatedRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationData>();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<UserRegistrationData> = async (data) => {
    try {
      const response = await join(data);
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
        <div className="w-full">
          <img className="w-28" src="/img/logo-default.png" />
          <div className="w-full mb-3">
            <div className="font-semibold text-3xl text-secondary">Sign Up</div>
            <div className="font-semibold text-2xl">Welcome 👋</div>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Enter username"
          className="mb-2"
          label={'Username'}
          {...register('username', {
            required: 'This is required.',
          })}
        />
        <ErrorMessage message={errors.username?.message} />
        <Input
          type="email"
          placeholder="E-mail address"
          className="mb-2"
          label={'Email'}
          {...register('email', { required: 'This is required.' })}
        />
        <ErrorMessage message={errors.email?.message} />
        <Input
          type="password"
          placeholder="Password"
          className="mb-2"
          label={'Password'}
          {...register('password', {
            required: 'This is required.',
          })}
        />
        <ErrorMessage message={errors.password?.message} />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreement"
            required
            className="w-4 h-4 text-primary bg-primaryBackground rounded border-hintText focus:ring-primary"
          />
          <label htmlFor="agreement" className="ms-2 text-sm text-nowrap">
            I agree to the
            <span className="text-primary underline"> Terms of Service </span>
            and
            <span className="text-primary underline"> Privacy Policy</span>.
          </label>
        </div>
        <Button type="submit" text="Sign Up" />
        <p className="text-hintText mt-6 flex items-center justify-center">
          Already have an account?
          <Link
            to={'/sign-in'}
            className="text-secondary font-semibold underline ml-2"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
