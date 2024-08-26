import { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import GoBackHeaderTitle from './GoBackHeaderTitle';

interface GoBackHeaderProps {
  onBack: () => void;
  children?: ReactNode;
}

const GoBackHeaderImpl = ({ onBack, children }: GoBackHeaderProps) => {
  return (
    <header className="mb-5 relative">
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
