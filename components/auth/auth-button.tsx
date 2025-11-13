"use client";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  children: React.ReactNode;
  route: string;
}

const AuthButton = ({ children, route }: AuthButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(route);
  };
  return (
    <span onClick={onClick} className="w-full cursor-pointer">
      {children}
    </span>
  );
};

export default AuthButton;
