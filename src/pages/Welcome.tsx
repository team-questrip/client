import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import welcomeImage from '/img/welcome.webp';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center pt-[24rem]">
      <div className="absolute top-0 left-0">
        <img src={welcomeImage} alt="welcome image" />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to Questrip</h2>
      <p className="font-light mb-3">Experience the place as locals do</p>
      <Button
        text="Continue with E-mail"
        className="mb-3"
        onClick={() => {
          navigate('/sign-in');
        }}
      />
      <Button
        text="Sign up for Questrip"
        variant="secondary"
        onClick={() => {
          navigate('/sign-up');
        }}
      />
    </div>
  );
};

export default Welcome;
