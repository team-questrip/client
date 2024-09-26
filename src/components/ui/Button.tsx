import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button = ({
  onClick,
  text,
  type = 'button',
  variant = 'primary',
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full h-12 py-2 rounded-lg font-bold  ${
        variant === 'primary'
          ? 'bg-subColor text-white'
          : 'bg-mainColor text-black'
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
