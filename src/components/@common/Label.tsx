import { ReactNode } from 'react';

interface LabelProps {
  className?: string;
  children: ReactNode;
}

const Label = ({ className, children }: LabelProps) => {
  return (
    <span
      className={` text-white inline-flex justify-center items-center whitespace-nowrap py-1 px-2 rounded-md text-sm ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;
