import { BsExclamationTriangle } from "react-icons/bs";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-300 p-3 text-sm text-red-600">
      <BsExclamationTriangle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
