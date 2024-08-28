import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface SignInInputProps {
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  placeholder,
  className,
  name,
  label,
  onChange,
}: SignInInputProps) => {
  return (
    <>
      <div className='w-full flex-col justify-start items-start gap-2 inline-flex'>
        <div className='text-primaryText'>{label}</div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`w-full h-14 text-primaryText font-medium placeholder:text-hintText border-info border rounded-lg py-2 px-4 ${className}`}
            onChange={onChange}
      />
      </div>
    </>
  );
};

export default Input;
