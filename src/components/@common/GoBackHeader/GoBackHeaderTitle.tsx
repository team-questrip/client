import { ReactNode } from 'react';

interface GoBackHeaderTitleProps {
  children: ReactNode;
}

const GoBackHeaderTitle = ({ children }: GoBackHeaderTitleProps) => {
  return (
    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
      {children}
    </h1>
  );
};

export default GoBackHeaderTitle;
