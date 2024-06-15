import { useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import { FormEvent, useState } from 'react';
import { AuthenticationData } from '../interface/user';
import { login } from '../api/user';

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
      console.log(response.data);
      // todo: 유저정보저장
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
      <h2>Welcome back!</h2>
      <input
        type="email"
        placeholder="E-mail address"
        name="email"
        onChange={(e) => {
          setSignInData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => {
          setSignInData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <button type="submit" className="w-full">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
