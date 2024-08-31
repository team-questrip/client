import { ReactNode } from 'react';
import GoBackHeaderTitle from './GoBackHeaderTitle';
import LeftArrow from '../ui/icon/LeftArrow';

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
        <LeftArrow />
      </button>
      {children}
    </header>
  );
};

const GoBackHeader = Object.assign(GoBackHeaderImpl, {
  Title: GoBackHeaderTitle,
});

export default GoBackHeader;
