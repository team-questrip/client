import { useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import { FormEvent, useState } from 'react';
import { AuthenticationData } from '../interface/user';
import { login } from '../api/user';
import Button from '../components/Button';
import SignInInput from '../components/SignInInput';

const SignIn = () => {
  const navigate = useNavigate();
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
      const {
        accessToken,
        user: { email, username },
      } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userInfo', JSON.stringify({ email, username }));
      navigate('/');
    } catch (error) {
      console.log(error);
      // todo: 에러 핸들링
    }
  };

  // todo: input 쓰는 상호작용 부분을 hook으로 추상화할 수 있어보임.
  return (
    <form onSubmit={handleSubmit}>
      <GoBackHeader
        onBack={() => {
          navigate('/');
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
    </form>
  );
};

export default SignIn;
