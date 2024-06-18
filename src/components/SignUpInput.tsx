import { HTMLInputTypeAttribute, forwardRef } from 'react';

interface SignUpInputProps {
  defaultValue: string;
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const SignUpInput = forwardRef<HTMLInputElement, SignUpInputProps>(
  ({ defaultValue, className, type, placeholder }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        defaultValue={defaultValue}
        className={`w-full text-mainTextColor placeholder:text-mainTextColor bg-mainColorLight border-mainInputBorderColor border rounded-lg py-2 px-4 ${className}`}
      />
    );
  }
);

export default SignUpInput;
