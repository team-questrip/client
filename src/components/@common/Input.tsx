import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      className,
      name,
      label,
      onChange,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-primaryText">{label}</div>
          <input
            type={type}
            placeholder={placeholder}
            ref={ref}
            className={`w-full h-14 text-primaryText font-medium placeholder:text-hintText border-info border rounded-lg py-2 px-4 ${className}`}
            name={name}
            onChange={onChange}
            {...props}
          />
        </div>
      </>
    );
  }
);
export default Input;
