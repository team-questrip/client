import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationData } from '../types/user';
import { join } from '../api/user';
import { storeAuthenticationResponseDataToLocalStorage } from '../utils/user';
import useAuthenticatedRedirect from '../hooks/useAuthenticatedRedirect';
import Input from '../components/Input';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import Button from '../components/Button';
import { APIErrorResponse } from '../types/api';
import { useToast } from "../hooks/useContexts";
import { AxiosError } from 'axios';

const SignUp = () => {
  useAuthenticatedRedirect();
  const [signUpData, setSignUpData] = useState<AuthenticationData>({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await join(signUpData);
      storeAuthenticationResponseDataToLocalStorage(response.data.data);
      navigate('/');
    } catch (error) {
      const errorObj = error as AxiosError<APIErrorResponse>;
      const message = errorObj.response
        ? errorObj.response.data.message
        : "Something went wrong.";

      showToast(message, "error");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSignUp}
      >
        <GoBackHeader 
          onBack={() => {
            navigate(-1);
          }}
        />
        <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
          <img
            className="w-28"
            src="/img/logo-default.png"
          />
          <div className="w-full h-32 relative flex-col justify-start items-start gap-2.5">
            <div className="font-semibold text-3xl text-secondary">Sign Up</div>
            <div className="font-semibold text-2xl">Welcome 👋</div>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Enter username"
          name="email"
          onChange={(e) => {
            setSignUpData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-4"
          label={"Username"}
        />
        <Input
          type="email"
          placeholder="E-mail address"
          name="email"
          onChange={(e) => {
            setSignUpData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-4"
          label={"Email"}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setSignUpData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          className="mb-4"
          label={"Password"}
        />
        <div className="flex items-center mb-4">
          <input type="checkbox" id="agreement" value="" className="w-4 h-4 text-primary bg-primaryBackground rounded border-hintText focus:ring-primary" />
          <label htmlFor="agreement" className="ms-2 text-sm">
            <span>I agree to the </span>
            <span className="text-primary underline">Terms of Service</span>
            <span> and </span>
            <span className="text-primary underline">Privacy Policy</span>
            <span>.</span>
          </label>
        </div>
        <Button type="submit" text="Sign Up" />
        <p className="text-hintText mt-6 flex items-center justify-center">
            Already have an account?
            <Link
              to={"/sign-in"}
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
