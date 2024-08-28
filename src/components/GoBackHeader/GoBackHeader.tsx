import { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import GoBackHeaderTitle from './GoBackHeaderTitle';

interface GoBackHeaderProps {
  onBack: () => void;
  children?: ReactNode;
  className?: string;
}

const GoBackHeaderImpl = ({
  onBack,
  children,
  className,
}: GoBackHeaderProps) => {
  return (
    <header className={`relative ${className}`}>
      <button
        onClick={() => {
          onBack();
        }}
      >
        <FaArrowLeft />
      </button>
      {children}
    </header>
  );
};

const GoBackHeader = Object.assign(GoBackHeaderImpl, {
  Title: GoBackHeaderTitle,
});

export default GoBackHeader;
