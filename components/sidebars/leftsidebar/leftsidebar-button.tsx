"use client";

import Image from "next/image";
import AuthButton from "@/components/auth/auth-button";
import LoginSigninButtons from "@/components/auth/login-signin-button";

const LeftSidebarButton = () => {
  const isLoggedInUser = false;
  return (
    <>
      {isLoggedInUser ? (
        <AuthButton>
          <div className="rounded-2 text-dark-light100_light-dark900 hover:bg-light-800 dark:hover:bg-dark-400 base-medium flex items-center gap-2 p-3 transition">
            <Image src={"/icons/logout.svg"} alt="logout icon" width={20} height={20} className="invert-colors" />
            <p>Logout</p>
          </div>
        </AuthButton>
      ) : (
        <LoginSigninButtons />
      )}
    </>
  );
};

export default LeftSidebarButton;
