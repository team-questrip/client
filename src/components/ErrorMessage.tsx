interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <>{message ? <p className="text-error">{message}</p> : null}</>;
};

export default ErrorMessage;
