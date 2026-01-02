"use client";
import { signOut } from "next-auth/react";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = () => {
    signOut({
      redirectTo: "/",
    });
  };
  return <span onClick={onClick}>{children}</span>;
};

export default LogoutButton;
