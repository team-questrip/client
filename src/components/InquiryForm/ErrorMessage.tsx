interface ErrorMessage {
  text?: string;
}

const ErrorMessage = ({ text }: ErrorMessage) => {
  return <p className="text-xs text-red-600">⚠️ {text}</p>;
};
export default ErrorMessage;
