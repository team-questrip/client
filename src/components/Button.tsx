import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button = ({ onClick, text, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full bg-subColor text-white py-2 rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
