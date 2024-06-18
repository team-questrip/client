import { FaArrowLeft } from 'react-icons/fa';

interface GoBackHeaderProps {
  onBack: () => void;
}

const GoBackHeader = ({ onBack }: GoBackHeaderProps) => {
  return (
    <header className="mb-5">
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
