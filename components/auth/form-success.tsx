import { BsCheckCircle } from "react-icons/bs";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-100 p-3 text-sm text-green-600">
      <BsCheckCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
