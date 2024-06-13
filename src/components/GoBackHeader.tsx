import { FaArrowLeft } from 'react-icons/fa';

interface GoBackHeaderProps {
  onBack: () => void;
}

const GoBackHeader = ({ onBack }: GoBackHeaderProps) => {
  return (
    <header>
      <button
        onClick={() => {
          onBack();
        }}
      >
        <FaArrowLeft />
      </button>
    </header>
  );
};

export default GoBackHeader;
