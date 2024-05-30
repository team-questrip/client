import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface HeaderText {
  text?: string;
}

const Header = ({ text }: HeaderText) => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <header className="pb-3 flex justify-center">
      <IoArrowBack
        onClick={handleBackPage}
        className="cursor-pointer size-6 hover:scale-125 absolute left-0 ml-3"
      />
      <div className="font-semibold">{text}</div>
    </header>
  );
};
export default Header;
