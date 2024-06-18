import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface SignInInputProps {
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignInInput = ({
  type,
  placeholder,
  className,
  onChange,
}: SignInInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full text-mainTextColor placeholder:text-mainTextColor bg-mainColorLight border-mainInputBorderColor border rounded-lg py-2 px-4 ${className}`}
      onChange={onChange}
    />
  );
};

export default SignInInput;
