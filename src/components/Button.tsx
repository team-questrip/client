interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button className="w-full" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
